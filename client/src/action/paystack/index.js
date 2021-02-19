import axios from "axios";
import { serverMessage } from "../notifications";

import {allInvestment} from '../investments/allInvestment'

export const makePayment = (paymentRef,investmentId) => async (dispatch) => {
  try {
    const res = await axios.put("/api/user/paystack", {paymentRef,investmentId});
    dispatch(serverMessage(res.status, res.data));
    /* redispatch all investment for latest update */
   dispatch(allInvestment())
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
  }
};
