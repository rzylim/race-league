import UiActionTypes from "./ui.types";

export const fetchUiData = () => ({
  type: UiActionTypes.FETCH_UI_DATA_START,
});

export const fetchUiDataSuccess = (data) => ({
  type: UiActionTypes.FETCH_UI_DATA_SUCCESS,
  payload: data,
});

export const fetchUiDataFailure = (error) => ({
  type: UiActionTypes.FETCH_UI_DATA_FAILURE,
  payload: error,
});

export const uiNewUpdateItem = (data) => ({
  type: UiActionTypes.UI_NEW_UPDATE_ITEM,
  payload: data,
});

export const uiDeleteItem = (data) => ({
  type: UiActionTypes.UI_DELETE_ITEM,
  payload: data,
});

export const uiNewSubitem = (data) => ({
  type: UiActionTypes.UI_NEW_SUBITEM,
  payload: data,
});

export const uiUpdateSeries = (data) => ({
  type: UiActionTypes.UI_UPDATE_SERIES,
  payload: data,
});
