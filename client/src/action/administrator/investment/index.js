
import axios from 'axios'
import { serverMessage } from '../../notifications'

export const IndexInvestment = (page) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/admin/investment/?page=${page}`)
        return data
    } catch (error) {
        dispatch(serverMessage(error.response.status, error.response.data))
    }
}