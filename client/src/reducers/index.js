import { combineReducers } from "redux";
import { reducer as reducerForm } from "redux-form";
import { notification } from "./notification";
import { currentuser } from "./auth/current-user";
import { investments } from './investments'
import { viewInvestments } from './investments/view'
import { search } from './investments/search'
import { fileProgress } from './file'
import { profile } from './profile'
import { adminAuth } from './admin'
import { count } from './counts'
export const reducer = combineReducers({
  form: reducerForm,
  notification,
  currentuser,
  investments,
  investmentDetails: viewInvestments,
  fileProgress,
  profile,
  adminAuth,
  count,
  search
});
