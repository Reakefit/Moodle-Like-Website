import { combineReducers } from "redux";

import authReducer from "./AuthReducer.js";
import errorReducer from "./ErrorReducer.js";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});