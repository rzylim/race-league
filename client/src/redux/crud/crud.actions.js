import CrudActionTypes from "./crud.types";

export const dashboardNewItem = (data) => ({
  type: CrudActionTypes.DASHBOARD_NEW_ITEM,
  payload: data,
});

export const dashboardNewItemSuccess = () => ({
  type: CrudActionTypes.DASHBOARD_NEW_ITEM_SUCCESS,
});

export const dashboardNewItemFailure = (error) => ({
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

export const newChampionship = (data) => ({
  type: CrudActionTypes.NEW_CHAMPIONSHIP,
  payload: data,
});

export const newChampionshipSuccess = () => ({
  type: CrudActionTypes.NEW_CHAMPIONSHIP_SUCCESS,
});

export const newChampionshipFailure = (error) => ({
  type: CrudActionTypes.NEW_CHAMPIONSHIP_FAILURE,
  payload: error,
});

export const updateChampionship = (data) => ({
  type: CrudActionTypes.UPDATE_CHAMPIONSHIP,
  payload: data,
});

export const updateChampionshipSuccess = () => ({
  type: CrudActionTypes.UPDATE_CHAMPIONSHIP_SUCCESS,
});

export const updateChampionshipFailure = (error) => ({
  type: CrudActionTypes.UPDATE_CHAMPIONSHIP_FAILURE,
  payload: error,
});

export const deleteChampionship = (data) => ({
  type: CrudActionTypes.DELETE_CHAMPIONSHIP,
  payload: data,
});

export const deleteChampionshipSuccess = () => ({
  type: CrudActionTypes.DELETE_CHAMPIONSHIP_SUCCESS,
});

export const deleteChampionshipFailure = (error) => ({
  type: CrudActionTypes.DELETE_CHAMPIONSHIP_FAILURE,
  payload: error,
});
