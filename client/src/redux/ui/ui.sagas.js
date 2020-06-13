import { takeLatest, put, all, call } from "redux-saga/effects";

import UiActionTypes from "./ui.types";

import { fetchUiDataSuccess, fetchUiDataFailure } from "./ui.actions";

import { getUiData } from "./ui.utils";

export function* onFetchUiData() {
  yield takeLatest(UiActionTypes.FETCH_UI_DATA_START, fetchUiData);
}

export function* fetchUiData() {
  try {
    const uiData = yield getUiData();
    if (!uiData) return;
    yield put(fetchUiDataSuccess(uiData));
  } catch (error) {
    yield put(fetchUiDataFailure(error));
  }
}

export function* uiSagas() {
  yield all([call(onFetchUiData)]);
}
