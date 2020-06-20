import axios from "axios";
import { takeLatest, put, all, call } from "redux-saga/effects";

import CrudActionTypes from "./crud.types";

import {
  dashboardNewItemSuccess,
  dashboardNewItemFailure,
  dashboardUpdateItemSuccess,
  dashboardUpdateItemFailure,
  dashboardDeleteItemSuccess,
  dashboardDeleteItemFailure,
  newChampionshipSuccess,
  newChampionshipFailure,
  updateChampionshipSuccess,
  updateChampionshipFailure,
  updateChampionshipSubitemSuccess,
  updateChampionshipSubitemFailure,
  deleteChampionshipSuccess,
  deleteChampionshipFailure,
} from "./crud.actions";

import {
  fetchUiData,
  uiNewUpdateItem,
  uiDeleteItem,
  uiUpdateSeries,
} from "../ui/ui.actions";

import { objectArraysToObjectsReducer } from "../../utilities/objectArraysToObjects";

export function* onDashboardNewItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_NEW_ITEM, dashboardNewItem);
}

export function* dashboardNewItem({
  payload: { history, collection, itemType, ...data },
}) {
  try {
    const res = yield axios.post("/api/crud/item", data);
    yield put(dashboardNewItemSuccess()); // for debug purposes
    yield put(
      uiNewUpdateItem({
        collection,
        data: Object.entries(res.data).reduce(objectArraysToObjectsReducer, {}),
      })
    );
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dashboardNewItemFailure(error));
  }
}

export function* onDashboardUpdateItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_UPDATE_ITEM, dashboardUpdateItem);
}

export function* dashboardUpdateItem({
  payload: { history, collection, itemType, ...data },
}) {
  try {
    const res = yield axios.put("/api/crud/item", data);
    yield put(dashboardUpdateItemSuccess()); // for debug purposes
    yield put(
      uiNewUpdateItem({
        collection,
        data: Object.entries(res.data).reduce(objectArraysToObjectsReducer, {}),
      })
    );
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dashboardUpdateItemFailure(error));
  }
}

export function* onDashboardDeleteItem() {
  yield takeLatest(CrudActionTypes.DASHBOARD_DELETE_ITEM, dashboardDeleteItem);
}

export function* dashboardDeleteItem({
  payload: { history, collection, itemType, _id, ...data },
}) {
  try {
    yield axios.delete("/api/crud/item", { data: { ...data, _id } });
    yield put(dashboardDeleteItemSuccess()); // for debug purposes
    yield put(
      uiDeleteItem({
        collection,
        key: _id,
      })
    );
    yield put(fetchUiData());
    history.push(`/dashboard/${itemType}`);
  } catch (error) {
    yield put(dashboardDeleteItemFailure(error));
  }
}

export function* onNewChampionship() {
  yield takeLatest(CrudActionTypes.NEW_CHAMPIONSHIP, newChampionship);
}

export function* newChampionship({ payload: { history, ...data } }) {
  try {
    const res = yield axios.post("/api/crud/championship", data);
    yield put(newChampionshipSuccess()); // for debug purposes
    yield put(
      uiNewUpdateItem({
        collection: "championships",
        data: Object.entries(res.data).reduce(objectArraysToObjectsReducer, {}),
      })
    );
    yield put(uiUpdateSeries(res.data));
    history.push(`/championship/${res.data._id}`);
  } catch (error) {
    yield put(newChampionshipFailure(error));
  }
}

export function* onUpdateChampionship() {
  yield takeLatest(CrudActionTypes.UPDATE_CHAMPIONSHIP, updateChampionship);
}

export function* updateChampionship({
  payload: { history, seriesLink, ...data },
}) {
  try {
    yield axios.put("/api/crud/championship", data);
    yield put(updateChampionshipSuccess()); // for debug purposes
    yield put(fetchUiData());
    history.goBack();
  } catch (error) {
    yield put(updateChampionshipFailure(error));
  }
}

export function* onUpdateChampionshipSubitem() {
  yield takeLatest(
    CrudActionTypes.UPDATE_CHAMPIONSHIP_SUBITEM,
    updateChampionshipSubitem
  );
}

export function* updateChampionshipSubitem({
  payload: { history, seriesLink, ...data },
}) {
  try {
    const res = yield axios.put("/api/crud/championship/sub", data);
    yield put(updateChampionshipSubitemSuccess()); // for debug purposes
    yield put(
      uiNewUpdateItem({
        collection: "championships",
        data: Object.entries(res.data).reduce(objectArraysToObjectsReducer, {}),
      })
    );
    history.goBack();
  } catch (error) {
    yield put(updateChampionshipSubitemFailure(error));
  }
}
export function* onDeleteChampionship() {
  yield takeLatest(CrudActionTypes.DELETE_CHAMPIONSHIP, deleteChampionship);
}

export function* deleteChampionship({
  payload: { history, seriesLink, ...data },
}) {
  try {
    yield axios.delete("/api/crud/championship", { data });
    yield put(deleteChampionshipSuccess()); // for debug purposes
    yield put(fetchUiData());
    history.push(`/${seriesLink}/championships`);
  } catch (error) {
    yield put(deleteChampionshipFailure(error));
  }
}

export function* crudSagas() {
  yield all([
    call(onDashboardNewItem),
    call(onDashboardUpdateItem),
    call(onDashboardDeleteItem),
    call(onNewChampionship),
    call(onUpdateChampionship),
    call(onDeleteChampionship),
    call(onUpdateChampionshipSubitem),
  ]);
}
