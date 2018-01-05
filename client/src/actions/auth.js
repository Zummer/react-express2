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
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VALIDATE_TOKEN_REQUEST,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILURE,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
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

export const validateToken = token => async (dispatch) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [VALIDATE_TOKEN_REQUEST, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_FAILURE],
        method: 'POST',
        endpoint: 'auth/validate_token',
        payload: { token }
      }
    });

    return action;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = data => async (dispatch) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [SET_NEW_PASSWORD_REQUEST, SET_NEW_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILURE],
        method: 'POST',
        endpoint: 'auth/set_new_password',
        payload: { data }
      }
    });

    return action;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordRequest = ({ email }) => async (dispatch) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
        method: 'POST',
        endpoint: 'auth/reset_password_request',
        payload: { email }
      }
    });

    return action;
  } catch (error) {
    throw error;
  }
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

