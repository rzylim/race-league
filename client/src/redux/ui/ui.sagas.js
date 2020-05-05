import { takeLatest, put, all, call } from "redux-saga/effects";

import UiActionTypes from "./ui.types";

import { loadUiDataSuccess, loadUiDataFailure } from "./ui.actions";

import { getSeries } from "./ui.utils";

export function* onLoadUiData() {
  yield takeLatest(UiActionTypes.LOAD_UI_DATA_START, loadUiData);
}

export function* loadUiData() {
  console.log("in loadUiData()");
  try {
    const series = yield getSeries();
    if (!series) return;
    yield put(loadUiDataSuccess(series));
  } catch (error) {
    yield put(loadUiDataFailure(error));
  }
}

export function* uiSagas() {
  yield all([call(onLoadUiData)]);
}
