import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { uiSagas } from "./ui/ui.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(uiSagas)]);
}
