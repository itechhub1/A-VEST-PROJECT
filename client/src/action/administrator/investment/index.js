import axios from 'axios'
import { serverMessage } from '../../notifications'

export const IndexInvestment = async (page) => {
  try {

    const { data } = await axios.get(`/api/admin/investment/?page=${page}`)

    return data
  } catch (error) {
    //  dispatch(serverMessage(error.response.status, error.response.data))
  }
}

export const PaidInvestment = async (page) => {
  try {

    const { data } = await axios.get(`/api/admin/paid-investment/?page=${page}`)
    return data
  } catch (error) {
    //  dispatch(serverMessage(error.response.status, error.response.data))
  }
}


export const CancelInvestment = async (page) => {
  try {

    const { data } = await axios.get(`/api/admin/terminated-investment/?page=${page}`)
    return data
  } catch (error) {
    //  dispatch(serverMessage(error.response.status, error.response.data))
  }
}


export const ExpiredInvestment = async (page) => {
  try {

    const { data } = await axios.get(`/api/admin/expired-investment/?page=${page}`)
    return data
  } catch (error) {
    //  dispatch(serverMessage(error.response.status, error.response.data))
  }
}

export const IndexInvestors = async (page) => {
  try {

    const { data } = await axios.get(`/api/admin/investment/?page=${page}`)
    return data
  } catch (error) {
    //  dispatch(serverMessage(error.response.status, error.response.data))
  }
}