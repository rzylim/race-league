import UiActionTypes from "./ui.types";

export const loadUiData = () => ({
  type: UiActionTypes.LOAD_UI_DATA_START,
});

export const signInSuccess = (data) => ({
  type: UiActionTypes.LOAD_UI_DATA_SUCCESS,
  payload: data,
});

export const signInFailure = (error) => ({
  type: UiActionTypes.LOAD_UI_DATA_FAILURE,
  payload: error,
});
