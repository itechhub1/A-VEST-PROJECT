import axios from 'axios'
import { serverMessage } from '../notifications'
import history from '../../history'


export const logout = () => async dispatch => {
    try {
        const { data, status } = await axios.get('/api/user/logout')
        dispatch(serverMessage(status, data))
        history.push('/')
    } catch (error) {
        dispatch(serverMessage(error.response.status, error.response.data))
    }
}