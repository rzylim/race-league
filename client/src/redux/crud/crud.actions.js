import CrudActionTypes from "./crud.types";

export const dasbboardNewItem = (data) => ({
  type: CrudActionTypes.DASHBOARD_NEW_ITEM,
  payload: data,
});

export const dasbboardNewItemSuccess = () => ({
  type: CrudActionTypes.DASHBOARD_NEW_ITEM_SUCCESS,
});

export const dasbboardNewItemFailure = (error) => ({
  type: CrudActionTypes.DASHBOARD_NEW_ITEM_FAILURE,
  payload: error,
});

export const dashboardUpdateItem = (data) => ({
  type: CrudActionTypes.DASHBOARD_UPDATE_ITEM,
  payload: data,
});

export const dashboardUpdateItemSuccess = () => ({
  type: CrudActionTypes.DASHBOARD_UPDATE_ITEM_SUCCESS,
});

export const dashboardUpdateItemFailure = (error) => ({
  type: CrudActionTypes.DASHBOARD_UPDATE_ITEM_FAILURE,
  payload: error,
});

export const dashboardDeleteItem = (data) => ({
  type: CrudActionTypes.DASHBOARD_DELETE_ITEM,
  payload: data,
});

export const dashboardDeleteItemSuccess = () => ({
  type: CrudActionTypes.DASHBOARD_DELETE_ITEM_SUCCESS,
});

export const dashboardDeleteItemFailure = (error) => ({
  type: CrudActionTypes.DASHBOARD_DELETE_ITEM_FAILURE,
  payload: error,
});
