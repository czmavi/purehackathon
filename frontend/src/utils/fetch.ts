import 'whatwg-fetch';

const apiUrl = '' // process.env.REACT_APP_API_URL;

interface IAuthState {
  token: string | null;
}

const { fetch } = window;

const authState: IAuthState = {
  token: null,
};

const getHeaders = (hasContent: boolean = false) => {
  const { token } = authState;

  const headers = new Headers();

  if (hasContent) {
    headers.append('Content-Type', 'application/json');
  }

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return headers;
};

export const setToken = (token: string): void => {
  authState.token = token;
};

export const checkStatus = (response: Response): Promise<any> => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204) {
      return Promise.resolve(null);
    }
    return response.json();
  } else {
    const error = new Error(response.statusText);
    throw error;
  }
};

export const storeToken = (response: Response): Response => {
  const authorization = response.headers.get('Authorization');
  if (authorization) {
    setToken(authorization);
  }

  return response;
};

export const get = (url: string): Promise<Response> =>
  fetch(apiUrl + url, { method: 'GET', headers: getHeaders() })
    .then(storeToken)
    .then(checkStatus);

export const post = (url: string, body?: object): Promise<Response> => {
  const requestData: any = { method: 'POST', headers: getHeaders(true) };
  if (body) {
    requestData.body = JSON.stringify(body);
  }
  return fetch(apiUrl + url, requestData)
    .then(storeToken)
    .then(checkStatus);
};

export const patch = (url: string, body: object): Promise<Response> =>
  fetch(apiUrl + url, {
    body: JSON.stringify(body),
    headers: getHeaders(true),
    method: 'PATCH',
  })
    .then(storeToken)
    .then(checkStatus);

export const remove = (url: string): Promise<Response> =>
  fetch(apiUrl + url, { method: 'DELETE', headers: getHeaders() })
    .then(storeToken)
    .then(checkStatus);
