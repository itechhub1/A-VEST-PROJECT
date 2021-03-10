import axios from "axios";
import { serverMessage } from "../../notifications";

import { adminCurrentUSer,adminAuthEror} from "../../type";

export const CurrentUser = (cb) => async (dispatch) => {
  // dispatch({ type: loading });
  try {
    const { data } = await axios.get("/api/admin/currentuser");
    dispatch({
      type: adminCurrentUSer,
      payload: data,
    });
   
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
    dispatch({ type: adminAuthEror });
  }
  cb()
};
