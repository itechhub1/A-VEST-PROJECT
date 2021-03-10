import { getProfile } from "../type";
import axios from "axios";
import { serverMessage } from "../notifications";

export const AddProfile = (inputForm) => async (dispatch, getState) => {
  const imagekey = getState().fileProgress.key;
  if (!imagekey) return dispatch(serverMessage(401, "upload a file..."));
  try {
    const { data } = await axios.post("/api/user/profile", {
      ...inputForm,
      attachment: imagekey,
    });
    dispatch({
      type: getProfile,
      payload: data,
    });
  } catch (error) {
    dispatch(serverMessage(error.response.status, error.response.data));
  }
};
