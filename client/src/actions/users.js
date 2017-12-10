import {
  CALL_API,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../types';

import { userLoggedIn } from './auth';

export const signup = data => async (dispatch, getState) => {
  try {
    const action = await dispatch({
      [CALL_API]: {
        types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
        method: 'POST',
        endpoint: 'users',
        payload: { data }
      }
    });

    if (action.type === SIGNUP_SUCCESS && action.response) {
      const user = action.response;

      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user));
    }

    return action;
  } catch (error) {
    throw error;
  }
}

