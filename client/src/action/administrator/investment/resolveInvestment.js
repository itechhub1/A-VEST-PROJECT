
import axios from "axios";
import { serverMessage } from "../../notifications";



export const ResolvedInvestment = (investmentId,cb) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/admin/resolve-roi/${investmentId}`);
        dispatch(serverMessage(res.status, res.data));
        /* redispatch all investment for latest update */
   cb()
    } catch (error) {
        dispatch(serverMessage(error.response.status, error.response.data));
    }
};
