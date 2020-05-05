import UiActionTypes from "./ui.types";

const INITIAL_STATE = {
  series: null,
  championships: null,
  error: null,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.LOAD_UI_DATA_SUCCESS:
      return {
        ...state,
        series: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
