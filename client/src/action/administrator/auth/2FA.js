import axios from 'axios'
import { redirector } from '../../redirector'
import { serverMessage } from '../../notifications'

export const TwoFactorAuth = (userInput, cb) => async (dispatch, getState) => {

    const adminId = getState().adminAuth.tokenId?.id
   
    try {
        const { data } = await axios.post('/api/admin/2FA', { ...userInput, adminId })
        redirector(data)

    } catch (error) {
        dispatch(serverMessage(error.response.status, error.response.data))
    }

    cb()
}