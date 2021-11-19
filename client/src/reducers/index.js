import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import errorReducer from "./ErrorReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});