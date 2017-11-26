import { USER_LOGGED_IN } from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.response;
    default:
      return state;
  }
}

