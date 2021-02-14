import axios from "axios";
import { serverMessage } from "../notifications";

export const makePayment = (refId) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/paystack", refId);
    dispatch(serverMessage(res.status, res.data));
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
  }
};
