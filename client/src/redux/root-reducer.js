import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import uiReducer from "./ui/ui.reducer";
import crudReducer from "./crud/crud.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  crud: crudReducer,
});

export default rootReducer;
