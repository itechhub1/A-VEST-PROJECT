import { combineReducers } from "redux";
import { reducer as reducerForm } from "redux-form";
import { notification } from "./notification";
import { currentuser } from "./auth/current-user";
import {investments} from './investments'
import {viewInvestments} from './investments/view'
import{fileProgress} from './file'
import {profile} from './profile'
import {adminAuth} from './admin'
export const reducer = combineReducers({
  form: reducerForm,
  notification,
  currentuser,
  investments,
  investmentDetails:viewInvestments,
  fileProgress,
  profile,
  adminAuth
});
