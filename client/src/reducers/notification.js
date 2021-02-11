import { newMessage, clearMessage } from "../action/type";

const initialState = {};

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case newMessage:
      return {
        ...state,
        ...action.payload,
      };

    case clearMessage:
      return {};

    default:
      return state;
  }
};
