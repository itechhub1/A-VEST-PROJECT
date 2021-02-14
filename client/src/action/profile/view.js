import { getProfile } from "../type";
import axios from "axios";
import { serverMessage } from "../notifications";

export const viewProfile = (cb) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/user/profile");
    dispatch({
      type: getProfile,
      payload: data,
    });

    cb();
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
  }
};
