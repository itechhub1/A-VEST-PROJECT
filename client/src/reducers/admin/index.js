import { adminLoginUser, adminCurrentUSer, adminAuthEror } from '../../action/type'

const initialState = {
    isAuth: false
}


export const adminAuth = (state = initialState, action) => {
    switch (action.type) {
        case adminLoginUser:
            return { ...state, tokenId: { ...action.payload } }

        case adminCurrentUSer:
            return { ...state, ...action.payload, isAuth: true }

        case adminAuthEror:
            return { isAuth: false }

        default:
            return state
    }
}