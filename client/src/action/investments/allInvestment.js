import { getInvestments } from "../type";
import axios from "axios";

export const allInvestment = (cb) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/investment");
    dispatch({
      type: getInvestments,
      payload: data,
    });
    cb()
  } catch (error) {}

  
};
