import UiActionTypes from "./ui.types";

export const loadUiData = () => ({
  type: UiActionTypes.LOAD_UI_DATA_START,
});

export const loadUiDataSuccess = (data) => ({
  type: UiActionTypes.LOAD_UI_DATA_SUCCESS,
  payload: data,
});

export const loadUiDataFailure = (error) => ({
  type: UiActionTypes.LOAD_UI_DATA_FAILURE,
  payload: error,
});

export const submitNewItem = (data) => ({
  type: UiActionTypes.SUBMIT_NEW_ITEM,
  payload: data,
});

export const submitNewItemSuccess = () => ({
  type: UiActionTypes.SUBMIT_NEW_ITEM_SUCCESS,
});

export const submitNewItemFailure = (error) => ({
  type: UiActionTypes.SUBMIT_NEW_ITEM_FAILURE,
  payload: error,
});
