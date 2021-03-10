import { cancelInvestment } from "../type";
import { serverMessage } from "../notifications";
import axios from "axios";
import {allInvestment} from './allInvestment'

export const deleteInvestement = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/investment/delete/${id}`);
    dispatch(serverMessage(res.status, res.data));
    dispatch({
      type: cancelInvestment,
      payload:id
    });
    dispatch(serverMessage(200,res.data))
    dispatch(allInvestment())
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
  }
};

