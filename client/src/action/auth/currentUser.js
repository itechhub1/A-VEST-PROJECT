import axios from "axios";
import { serverMessage } from "../notifications";

import { currentUser, authError } from "../type";

export const CurrentUser = (cb) => async (dispatch) => {
  // dispatch({ type: loading });
  try {
    const { data } = await axios.get("/api/user/currentuser");
    dispatch({
      type: currentUser,
      payload: data,
    });
   
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
    dispatch({ type: authError });
  }
  cb()
};
