import authReducer from "./authReducer";
import shortUrlReducer from "./shortUrlReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  shortUrl: shortUrlReducer
});

export default rootReducer;
