import axios from "axios";
import { serverMessage } from "../../notifications";
import history from '../../../history'
import { adminLoginUser } from '../../type'
export const AdminLogin = (userInput, cb) => async (dispatch) => {
  
  try {
    const { data } = await axios.post("/api/admin-login", userInput);

    dispatch({
      type: adminLoginUser,
      payload: data
    })
    history.push('/verify/2FA')
  } catch (error) {
    
    dispatch(serverMessage(error.response.status, error.response.data));
  }
  cb()
};
