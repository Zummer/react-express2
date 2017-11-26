import {
  CALL_API,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOGGED_IN
} from '../types';

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
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

      dispatch(userLoggedIn(user));
    }

    return action;
  } catch (error) {
    throw error;
  }
};
