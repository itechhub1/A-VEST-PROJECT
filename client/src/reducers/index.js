import { combineReducers } from "redux";
import {reducer as reducerForm} from 'redux-form'

export const reducer = combineReducers({form:reducerForm});
