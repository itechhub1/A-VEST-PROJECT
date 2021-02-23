import { searchInvestment } from "../../action/type";

const initialState = null;

export const search = (state = initialState, action) => {
    switch (action.type) {
        case searchInvestment:
            return action.payload;
        default:
            return state;
    }
};
