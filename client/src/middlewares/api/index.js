import { callApi } from './callApi';
import { CALL_API } from '../../types';
import { validateTypes } from './validateTypes';

export default store => next => async action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, payload, method, types, testUrl, queryParams } = callAPI;

  validateTypes(types);

  // final action
  const actionWith = obj => {
    const finalAction = {
      ...action,
      ...obj
    };

    // delete finalAction[CALL_API];

    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  const token = localStorage.jwtToken;

  next(
    actionWith({
      type: requestType,
      status: 'SEND'
    })
  );

  try {
    const response = await callApi(endpoint, method, token, queryParams, payload, testUrl);

    return next(
      actionWith({
        type: successType,
        response,
        status: 'SUCCESS'
      })
    );
  } catch (error) {
    return next(
      actionWith({
        type: failureType,
        error,
        message: error.message || 'Something bad happened',
        status: 'FAIL'
      })
    );
  }
};

