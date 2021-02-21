
import { viewInvestment } from "../../type";
import { serverMessage } from "../../notifications";

import axios from "axios";

export const ViewAdminInvestment = (id, cb) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/admin/investment/${id}`);
    dispatch({
      type: viewInvestment,
      payload: data,
    });
  } catch (error) {
    serverMessage(error.response.status, error.response.data);
  }

  cb();
};