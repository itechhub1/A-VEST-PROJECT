import { getInvestments, cancelInvestment } from "../../action/type";

const initialState = [];

export const investments = (state = initialState, action) => {
  switch (action.type) {
    case getInvestments:
      return [...action.payload];

    case cancelInvestment:
      const result = state.filter(
        (investment) => investment._id !== action.payload
      );
      return [result];

    default:
      return state;
  }
};
