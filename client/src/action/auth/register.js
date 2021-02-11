import axios from "axios";
import { serverMessage } from "../notifications";

export const registerUser = (userInput, cb) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/new", userInput);

    dispatch(serverMessage(res.status, res.data));
  } catch (error) {
    dispatch(serverMessage(400, error.response.data));
  }
  cb();
};
