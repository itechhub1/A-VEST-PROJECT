import { viewInvestment } from "../../action/type";

const initialState = null;

export const viewInvestments = (state = initialState, action) => {
  switch (action.type) {
    case viewInvestment:
      return action.payload;

    default:
      return state;
  }
};
