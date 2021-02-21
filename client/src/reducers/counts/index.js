import { numberOfCancelInv, numberOfExpiredInvestment, numberOfInvestment, numberOfPaidInvestment } from '../../action/type'
const initialValue = {}
export const count = (state = initialValue, action) => {
    switch (action.type) {
        case numberOfCancelInv:
            return {
                ...state,
                cancelInv: action.payload
            }

        case numberOfExpiredInvestment:
            return {
                ...state,
                expiredInv: action.payload
            }

        case numberOfInvestment:
            return {
                ...state,
                investmentCount: action.payload
            }

        case numberOfPaidInvestment:
            return {
                ...state,
                paidInv: action.payload
            }

        default:
            return state;
    }



}