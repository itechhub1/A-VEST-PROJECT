import axios from "axios";
import { serverMessage } from "../notifications";
import { redirector } from "../redirector";

export const signInUser = (userInput,cb) => async (dispatch) => {

  try {
    const { data } = await axios.post("/api/user/login", userInput);
  
    redirector(data);
  } catch (error) {
   
    dispatch(serverMessage(error.response.status, error.response.data));
  }
  cb()
};
