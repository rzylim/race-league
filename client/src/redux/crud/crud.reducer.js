import CrudActionTypes from "./crud.types";

const INITIAL_STATE = {
  error: null,
};

const crudReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CrudActionTypes.DASHBOARD_NEW_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CrudActionTypes.DASHBOARD_NEW_ITEM_SUCCESS:
    default:
      return state;
  }
};

export default crudReducer;
