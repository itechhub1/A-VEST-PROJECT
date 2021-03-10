import axios from "axios";
import { serverMessage } from "../notifications";


export const updateCredentials = (userInput) => async (dispatch) => {

    try {
        const { status, data } = await axios.put("/api/user/change-login", userInput);
        dispatch(serverMessage(status, data))

    } catch (error) {

        dispatch(serverMessage(error.response.status, error.response.data));
    }

};
