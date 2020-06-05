import axios from "axios";
import { takeLatest, put, all, call } from "redux-saga/effects";

import CrudActionTypes from "./crud.types";

import {
  dasbboardNewItemSuccess,
  dasbboardNewItemFailure,
  dashboardUpdateItemSuccess,
  dashboardUpdateItemFailure,
  dashboardDeleteItemSuccess,
  dashboardDeleteItemFailure,
} from "./crud.actions";

import { loadUiData } from "../ui/ui.actions";

export function* onDasbboardNewItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_NEW_ITEM, dasbboardNewItem);
}

export function* dasbboardNewItem({ payload: { history, itemType, ...data } }) {
  try {
    yield axios.post("/api/item/new", data);
    yield put(dasbboardNewItemSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dasbboardNewItemFailure(error));
  }
}

export function* onDashboardUpdateItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_UPDATE_ITEM, dashboardUpdateItem);
}

export function* dashboardUpdateItem({
  payload: { history, itemType, _id, ...data },
}) {
  try {
    yield axios.put(`/api/item/${_id}`, data);
    yield put(dashboardUpdateItemSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dashboardUpdateItemFailure(error));
  }
}

export function* onDashboardDeleteItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_DELETE_ITEM, dashboardDeleteItem);
}

export function* dashboardDeleteItem({
  payload: { history, itemType, _id, ...data },
}) {
  try {
    yield axios.delete(`/api/item/${_id}`, { data });
    yield put(dashboardDeleteItemSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dashboardDeleteItemFailure(error));
  }
}

export function* crudSagas() {
  yield all([
    call(onDasbboardNewItem),
    call(onDashboardUpdateItem),
    call(onDashboardDeleteItem),
  ]);
}