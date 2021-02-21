import React, { useState } from "react";

import { usePaginatedQuery } from "react-query";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
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

const Investment = ({ api }) => {
  const [page, setpage] = useState(0);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["applications", page],
    () => api(page)
  );

console.log(resolvedData);
  const renderInvestment = (resolvedData) => {
    if (status === "loading") {
      return <p>Getting Data</p>;
    } else if (status === "error") {
      return <p>Error fetching data</p>;
    } else if (status === "success") {
      if (resolvedData.investment.length === 0) return <p className="text-center w-full">No  Data</p>;
      return resolvedData.investment.reverse().map((inv) => (
        <TableRow>
          <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
            <div className="flex items-center space-x-3">
              {inv.fullname}
              {inv.cleared ? (
                <img
                  style={{ width: "20px" }}
                  src={require("../../assets/yes.png").default}
                  alt="aimart attened investment"
                />
              ) : (
                <img
                  style={{ width: "20px" }}
                  src={require("../../assets/no.png").default}
                  alt="aimart not attended"
                />
              )}
            </div>
          </TableCell>
          <TableCell align="center">
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
          <TableCell align="center">
            <Link to={`/admin/details/${inv._id}`}>
              <Button
                color="primary"
                variant="contained"
                size="small "
                style={{ marginRight: "4px", fontSize: "8px" }}
              >
                View
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      ));
    }
  };

  const table = useStyles();
  const tablecell = tableCell();

  return (
    <div className="flex flex-col">
      <TableContainer component={Paper}>
        <Table className={table.table} aria-label="simple table">
          <TableHead className={table.root}>
            <TableRow>
              <TableCell className={tablecell.root}>Name</TableCell>
              <TableCell className={tablecell.root} align="center">
                Plan
              </TableCell>
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
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderInvestment(resolvedData)}</TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-800 bg-gray-200 p-2">
          PAGE {page} total: {resolvedData?.total}{" "}
        </p>
        <div className=" space-x-2 ">
          <button
            className="bg-blue-800 rounded-md text-base text-white p-2 px-8"
            onClick={(e) => {
              if (page === 0) return e.preventDefault();
              setpage((page) => (!latestData.investment ? page : page - 1));
            }}
          >
            Prev Page
          </button>
          <button
            onClick={(e) => {
              if (latestData && latestData.total < 10)
                return e.preventDefault();

              if (latestData && latestData.total !== 0) {
                setpage((page) => (!latestData.investment ? page : page + 1));
              } else {
                <div className="absolute">You have reached the last page</div>;
              }
            }}
            className="bg-blue-800 rounded-md text-base text-white p-2 px-8"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Investment;
