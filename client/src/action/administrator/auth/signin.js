import axios from "axios";
import { serverMessage } from "../../notifications";
import history from '../../../history'
import { adminLoginUser } from '../../type'
export const AdminLogin = (userInput, cb) => async (dispatch) => {
  console.log(userInput);
  try {
    const { data } = await axios.post("/api/admin-login", userInput);

    dispatch({
      type: adminLoginUser,
      payload: data
    })
    history.push('/verify/2FA')
  } catch (error) {
    console.log(error);
    dispatch(serverMessage(error.response.status, error.response.data));
  }
  cb()
};
