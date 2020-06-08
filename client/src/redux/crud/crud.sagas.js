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
  newChampionshipSuccess,
  newChampionshipFailure,
  updateChampionshipSuccess,
  updateChampionshipFailure,
  deleteChampionshipSuccess,
  deleteChampionshipFailure,
} from "./crud.actions";

import { loadUiData } from "../ui/ui.actions";

export function* onDasbboardNewItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_NEW_ITEM, dasbboardNewItem);
}

export function* dasbboardNewItem({ payload: { history, itemType, ...data } }) {
  try {
    yield axios.post("/api/crud/item/new", data);
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
    yield axios.put(`/api/crud/item/${_id}`, data);
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
    yield axios.delete(`/api/crud/item/${_id}`, { data });
    yield put(dashboardDeleteItemSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dashboardDeleteItemFailure(error));
  }
}

export function* onNewChampionship() {
  yield takeLatest(CrudActionTypes.NEW_CHAMPIONSHIP, newChampionship);
}

export function* newChampionship({
  payload: { history, seriesLink, ...data },
}) {
  try {
    yield axios.post("/api/crud/championship/new", data);
    yield put(newChampionshipSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/${seriesLink}/championships`);
  } catch (error) {
    yield put(newChampionshipFailure(error));
  }
}

export function* onUpdateChampionship() {
  yield takeLatest(CrudActionTypes.UPDATE_CHAMPIONSHIP, updateChampionship);
}

export function* updateChampionship({
  payload: { history, seriesLink, _id, ...data },
}) {
  try {
    yield axios.put(`/api/crud/championship/${_id}`, data);
    yield put(updateChampionshipSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/${seriesLink}/championships`);
  } catch (error) {
    yield put(updateChampionshipFailure(error));
  }
}

export function* onDeleteChampionship() {
  yield takeLatest(CrudActionTypes.DELETE_CHAMPIONSHIP, deleteChampionship);
}

export function* deleteChampionship({
  payload: { history, seriesLink, _id, ...data },
}) {
  try {
    yield axios.delete(`/api/crud/championship/${_id}`, data);
    yield put(deleteChampionshipSuccess()); // for debug purposes
    yield put(loadUiData());
    history.push(`/${seriesLink}/championships`);
  } catch (error) {
    yield put(deleteChampionshipFailure(error));
  }
}

export function* crudSagas() {
  yield all([
    call(onDasbboardNewItem),
    call(onDashboardUpdateItem),
    call(onDashboardDeleteItem),
    call(onNewChampionship),
    call(onUpdateChampionship),
    call(onDeleteChampionship),
  ]);
}
