import { getProfile } from "../../action/type";

const initialState = null;

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case getProfile:
      return action.payload;
    default:
      return state;
  }
};
