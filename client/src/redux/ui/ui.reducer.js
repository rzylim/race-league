import UiActionTypes from "./ui.types";

const INITIAL_STATE = {
  uiData: null,
  error: null,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.FETCH_UI_DATA_SUCCESS:
      return {
        ...state,
        uiData: action.payload,
        error: null,
      };
    case UiActionTypes.FETCH_UI_DATA_FAILURE:
      // case UiActionTypes.DASHBOARD_NEW_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UiActionTypes.UI_NEW_UPDATE_ITEM:
      return {
        ...state,
        uiData: {
          ...state.uiData,
          [action.payload.collection]: {
            ...state.uiData[action.payload.collection],
            [action.payload.data._id]: action.payload.data,
          },
        },
      };
    case UiActionTypes.UI_DELETE_ITEM:
      delete state.uiData[action.payload.collection][action.payload.key];
      return state;
    case UiActionTypes.UI_UPDATE_SERIES:
      return {
        ...state,
        uiData: {
          ...state.uiData,
          series: {
            ...state.uiData.series,
            [action.payload.series]: {
              ...state.uiData.series[action.payload.series],
              regions: state.uiData.series[action.payload.series].regions.add(
                state.uiData.regions[action.payload.region].name
              ),
              tiers: state.uiData.series[action.payload.series].tiers.add(
                state.uiData.tiers[action.payload.tier].name
              ),
              games: state.uiData.series[action.payload.series].games.add(
                state.uiData.games[action.payload.game].name
              ),
            },
          },
        },
      };
    // case UiActionTypes.DASHBOARD_NEW_ITEM_SUCCESS:
    default:
      return state;
  }
};

export default uiReducer;
