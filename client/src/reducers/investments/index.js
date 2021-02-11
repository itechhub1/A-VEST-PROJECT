import { getInvestments } from "../../action/type";

const initialState = [];

export const investments = (state = initialState, action) => {
  switch (action.type) {
    case getInvestments:
      return [...action.payload];

    default:
      return state;
  }
};
