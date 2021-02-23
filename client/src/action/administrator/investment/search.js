import axios from 'axios'
import { searchInvestment } from '../../type'
import { serverMessage } from '../../notifications'

export const SearchInvestment = (investmentId, cb) => async dispatch => {
    try {

        const { data } = await axios.post(`/api/admin/search-investment`, investmentId)
        dispatch({
            type: searchInvestment,
            payload: data
        })

    } catch (error) {
        dispatch(serverMessage(error.response.status, error.response.data))
    }
    cb()

}

