import UiActionTypes from "./ui.types";

const INITIAL_SERIES = [
  {
    name: "Formula 1",
    games: ["F1 2019", "F1 2018"],
    link: "f1",
  },
  {
    name: "Gran Turismo",
    games: ["AssettoCorsa"],
    link: "gt",
  },
];

const INITIAL_STATE = {
  series: INITIAL_SERIES,
  championships: null,
  error: null,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.LOAD_UI_DATA_SUCCESS:
      return {
        ...state,
        series: action.payload.series,
      };
    default:
      return state;
  }
};

export default uiReducer;
