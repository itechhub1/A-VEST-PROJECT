import { viewInvestment } from "../type";
import { serverMessage } from "../notifications";

import axios from "axios";

export const ViewInvestment = (id, cb) => async (dispatch) => {

  try {
    const { data } = await axios.get(`/api/investment/${id}`);
    dispatch({
      type: viewInvestment,
      payload: data,
    });
  } catch (error) {
    serverMessage(error.response.status, error.response.data);
  }

  cb();
};
