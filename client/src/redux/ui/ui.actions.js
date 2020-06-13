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
