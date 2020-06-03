import UiActionTypes from "./ui.types";

const INITIAL_STATE = {
  uiData: null,
  error: null,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.LOAD_UI_DATA_SUCCESS:
      return {
        ...state,
        uiData: action.payload,
        error: null,
      };
    case UiActionTypes.LOAD_UI_DATA_FAILURE:
    case UiActionTypes.DASHBOARD_NEW_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UiActionTypes.DASHBOARD_NEW_ITEM_SUCCESS:
    default:
      return state;
  }
};

export default uiReducer;
