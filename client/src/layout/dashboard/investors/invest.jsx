import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { allInvestment } from "../../../action/investments";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteInvestement } from "../../../action/investments";
import MakePayment from "../../../components/paystack/payment";

/* modal */
import Modal from "../../../components/portal/Modal";
import ModalMssg from "../../../components/modal";

import {
  Button,
  ButtonGroup,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  root: {
    background: "linear-gradient(45deg, #1769aa 30%, #2196f3 90%)",
    color: "white",
  },
});

const tableCell = makeStyles({
  root: {
    color: "white",
    fontWeight: "bold",
  },
});

const Invest = ({ deleteInvestement, investment, allInvestment }) => {
  const [open, setopen] = useState(null);

  useEffect(() => {
    allInvestment();
  }, []);

  const renturnInvestment = (investment) => {
    if (investment.length === 0)
      return (
        <div className="">
          <p>Fetching your investment...</p>
        </div>
      );
    return investment.map((inv) => (
      <>
        <TableRow>
          <TableCell component="th" scope="row">
            {inv.plan}({inv.percentage})
          </TableCell>
          <TableCell align="center">
            ₦{inv.amount.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
          </TableCell>
          <TableCell align="center">
            ₦{inv.roi.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
          </TableCell>
          <TableCell align="center">
            {inv.status === "1" ? (
              <span className="text-yellow-800 p-2 bg-yellow-100 rounded-sm text-xs">
                Pending
              </span>
            ) : inv.status === "2" ? (
              <span className="text-red-800 p-2 bg-red-100 rounded-sm text-xs">
                Canceled
              </span>
            ) : (
              <span className="text-grren-800 p-2 bg-green-100 rounded-sm text-xs">
                Running
              </span>
            )}
          </TableCell>
          <TableCell align="center">
            {inv.payment ? (
              <span className="text-green-800 p-2 px-8 text-center bg-green-100 rounded-sm text-xs ">
                Paid
              </span>
            ) : (
              <span className="text-red-800 p-2 px-8 text-center w-32  bg-red-100 rounded-sm text-xs  ">
                Not paid
              </span>
            )}
          </TableCell>
          {inv.status === "1" ? (
            <TableCell align="center">
              {inv.paymentPlan === "paystack" ? (
                <MakePayment amount={inv.amount} investmentId={inv._id} />
              ) : (
                <p className="italic text-gray-800 text-xs">
                  selected bank deposit
                </p>
              )}
            </TableCell>
          ) : (
            <TableCell align="center">Payment succeded</TableCell>
          )}
          <TableCell align="center">
            <ButtonGroup>
              <Link to={`/dashboard/details/${inv._id}`}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small "
                  style={{ marginRight: "4px", fontSize: "8px" }}
                >
                  Details
                </Button>
              </Link>
              {inv.status === "0" && (
                <Button
                  onClick={() => setopen({ id: inv._id, status: true })}
                  color="secondary"
                  variant="contained"
                  size="small"
                  style={{ fontSize: "8px" }}
                >
                  cancel
                </Button>
              )}
            </ButtonGroup>
          </TableCell>
        </TableRow>
      </>
    ));
  };

  const table = useStyles();
  const tablecell = tableCell();
  return (
    <div className="w-full">
      <h1 className="font-semibold text-3xl mb-4">Investments</h1>
      <TableContainer component={Paper}>
        <Table className={table.table} aria-label="simple table">
          <TableHead className={table.root}>
            <TableRow>
              <TableCell className={tablecell.root}>Plan</TableCell>
              <TableCell className={tablecell.root} align="center">
                Initial Capital
              </TableCell>
              <TableCell className={tablecell.root} align="center">
                ROI
              </TableCell>
              <TableCell className={tablecell.root} align="center">
                Status
              </TableCell>
              <TableCell className={tablecell.root} align="center">
                Payment Status
              </TableCell>
              <TableCell className={tablecell.root} align="center">
                Payment Type
              </TableCell>
              <TableCell className={tablecell.root} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody> {renturnInvestment(investment)} </TableBody>
        </Table>
      </TableContainer>
      {open !== null && (
        <Modal>
          <ModalMssg
            action={() => {
              deleteInvestement(open.id);
              setopen(null);
            }}
            cancel={() => setopen(null)}
          />
        </Modal>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return { investment: state.investments };
};

export default connect(mapStateToProps, { deleteInvestement, allInvestment })(
  Invest
);
