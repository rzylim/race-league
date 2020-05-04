import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import uiReducer from "./ui/ui.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
