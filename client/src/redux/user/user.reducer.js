import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: {
    _id: null,
    role: null,
    seriesPermissions: [],
    championshipPermissions: [],
  },
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        // roles and permissions contained for harmless display purposes only, backend needs to re-verify user info from cookie
        currentUser: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
