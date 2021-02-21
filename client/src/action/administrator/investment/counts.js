import axios from 'axios'
import { numberOfCancelInv, numberOfExpiredInvestment, numberOfPaidInvestment, numberOfInvestment } from '../../type'


export const InvestmentCount = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/admin/registered-investment')
        dispatch({
            type: numberOfInvestment,
            payload: data
        })
    } catch (error) {

    }
}


export const CancledInvestment = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/admin/terminated-investment-count')
        dispatch({
            type: numberOfCancelInv,
            payload: data
        })
    } catch (error) {

    }
}

export const ExpiredInv = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/admin/expired-investment-count')
        dispatch({
            type: numberOfExpiredInvestment,
            payload: data
        })
    } catch (error) {

    }
}

export const PaidInvestment = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/admin/paid-investment-count')
        dispatch({
            type: numberOfPaidInvestment,
            payload: data
        })
    } catch (error) {

    }
}