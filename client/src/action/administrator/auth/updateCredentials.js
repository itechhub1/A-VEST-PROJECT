import axios from "axios";
import { serverMessage } from "../../notifications";


export const AdminupdateCredentials = (userInput) => async (dispatch) => {

    try {
        const { status, data } = await axios.put("/api/admin/change-login", userInput);
        dispatch(serverMessage(status, data))

    } catch (error) {

        dispatch(serverMessage(error.response.status, error.response.data));
    }

};
