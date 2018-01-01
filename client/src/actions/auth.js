import {
  CALL_API,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  CONFIRM_REQUEST,
  CONFIRM_SUCCESS,
  CONFIRM_FAILURE,
} from '../types';

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = credentials => async (dispatch) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        method: 'POST',
        endpoint: 'auth',
        payload: { credentials }
      }
    });


    if (action.type === LOGIN_SUCCESS && action.response) {
      const user = action.response;

      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user));
    }

    return action;
  } catch (error) {
    throw error;
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('bookwormJWT');
  return dispatch(userLoggedOut());
};

export const resetPasswordRequest = () => {
  return false;
};

export const confirm = token => async (dispatch) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [CONFIRM_REQUEST, CONFIRM_SUCCESS, CONFIRM_FAILURE],
        method: 'POST',
        endpoint: 'auth/confirmation',
        payload: { token }
      }
    });

    if (action.type === CONFIRM_SUCCESS && action.response) {
      const user = action.response;

      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user));
    }

    return action;
  } catch (error) {
    throw error;
  }
}

