import { currentUser, authError } from "../../action/type";

const initialState = {
  isAuth: false,
};

export const currentuser = (state = initialState, action) => {
  switch (action.type) {
    case currentUser:
      return {
        ...state,
        isAuth: true,
        ...action.payload,
      };

    case authError:
      return {
        ...state,
        isAuth: false,
      };

    default:
      return state;
  }
};
