import { newInvestment } from "../type";
import { serverMessage } from "../notifications";
import history from '../../history'
import axios from "axios";

export  const NewInvestment = (formInput, cb) => async (dispatch) => {
  
  try {
    const res = await axios.post("/api/investment/new", formInput);
    dispatch(serverMessage(res.status, res.data));
    cb();
    history.push('/dashboard/investment')
  } catch (error) {
    serverMessage(error.response.status, error.response.data);
    cb();
  }
};
