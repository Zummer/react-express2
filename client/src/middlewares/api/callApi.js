import queryString from 'query-string';

const API_ROOT = '/api/';

export const callApi = async (endpoint, method, token, queryParams, payload, testUrl) => {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  if (testUrl) {
    fullUrl = `${testUrl}/${fullUrl}`;
  }

  if (queryParams && typeof queryParams === 'object') {
    if(fullUrl.indexOf("/?") === -1) {
      fullUrl += `?${queryString.stringify(queryParams)}`;
    } else {
      fullUrl += `&${queryString.stringify(queryParams)}`;
    }
  }

  const requestOptions = {
    method,
    headers: {
      Accept: 'application/json'
    }
  };

  if (payload) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(payload);
  }

  if (token) {
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    console.log(fullUrl);

    const response = await fetch(fullUrl, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw data;
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export default callApi;

