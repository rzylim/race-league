import { takeLatest, put, all, call } from "redux-saga/effects";

import UiActionTypes from "./ui.types";

import { loadUiDataSuccess, loadUiDataFailure } from "./ui.actions";

import { getUiData } from "./ui.utils";

export function* onLoadUiData() {
  yield takeLatest(UiActionTypes.LOAD_UI_DATA_START, loadUiData);
}

export function* loadUiData() {
  try {
    const uiData = yield getUiData();
    if (!uiData) return;
    yield put(loadUiDataSuccess(uiData));
  } catch (error) {
    yield put(loadUiDataFailure(error));
  }
}

export function* uiSagas() {
  yield all([call(onLoadUiData)]);
}
