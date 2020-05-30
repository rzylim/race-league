import axios from "axios";
import { takeLatest, put, all, call } from "redux-saga/effects";

import UiActionTypes from "./ui.types";

import { loadUiDataSuccess, loadUiDataFailure } from "./ui.actions";
import {
  loadUiData as loadUiDataAction,
  submitNewItemSuccess,
  submitNewItemFailure,
} from "./ui.actions";

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

export function* onSubmitNewItem() {
  yield takeLatest(UiActionTypes.SUBMIT_NEW_ITEM, submitNewItem);
}

export function* submitNewItem({ payload: { history, link, ...toPost } }) {
  try {
    const res = yield axios.post("/api/item", toPost);
    yield put(submitNewItemSuccess()); // for debug purposes
    yield put(loadUiDataAction());
    history.push(`/dashboard/${link}/${res.data._id}`);
  } catch (error) {
    yield put(submitNewItemFailure(error));
  }
}

export function* uiSagas() {
  yield all([call(onLoadUiData), call(onSubmitNewItem)]);
}
