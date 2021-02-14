import { cancelInvestment } from "../type";
import { serverMessage } from "../notifications";
import axios from "axios";

export const deleteInvestement = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/investment/delete/${id}`);
    dispatch(serverMessage(res.status, res.data));
    dispatch({
      type: cancelInvestment,
      payload:id
    });
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
  }
};
