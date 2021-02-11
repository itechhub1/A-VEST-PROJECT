import { combineReducers } from "redux";
import { reducer as reducerForm } from "redux-form";
import { notification } from "./notification";
import { CurrentUser } from "./auth/current-user";
import {investments} from './investments'
import {viewInvestments} from './investments/view'

export const reducer = combineReducers({
  form: reducerForm,
  notification,
  CurrentUser,
  investments,
  investmentDetails:viewInvestments
});
