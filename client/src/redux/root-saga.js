import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { uiSagas } from "./ui/ui.sagas";
import { crudSagas } from "./crud/crud.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(uiSagas), call(crudSagas)]);
}
