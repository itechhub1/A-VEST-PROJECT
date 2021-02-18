import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makePayment } from "../../action/paystack";
import { viewProfile } from "../../action/profile/view";
const PaymentButton = ({
  user,
  viewProfile,
  makePayment,
  amount,
  investmentId,
}) => {
  /* check if attached document is uploaded if yes proceed to payments */

  const payWithPaystack = () => {
    var handler = window.PaystackPop.setup({
      key: "pk_test_c61416a3fbe75b46a24de076ee2dfe6acbbe474e",
      email: `${user.email}`,
      amount: `${amount * 100}`,
      ref: "" + Math.floor(Math.random() * amount + 1), //generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: `${user.firstname}`,
            variable_name: `${user.lastname}`,
            value: `${user.id}`,
          },
        ],
      },
      callback: function ({reference}) {
        makePayment(reference, investmentId);
      },
      onClose: function () {},
    });
    handler.openIframe();
  };

  return (
    <button
      onClick={() => viewProfile(() => payWithPaystack())}
      type="button"
      className="text-xs group bg-blue-100 text-blue-800 rounded-md  p px-4 hover:bg-blue-500  cursor-pointer hover:text-white border-0 "
      value="make payment"
    >
      make payment
    </button>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.currentuser,
  };
};

export default connect(mapStateToProps, { makePayment, viewProfile })(
  PaymentButton
);
