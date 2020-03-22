import UserActionTypes from "./user.types";

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

// export const discordSignInStart = () => ({
//   type: UserActionTypes.DISCORD_SIGN_IN_START
// });

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = user => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
  payload: user
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});
