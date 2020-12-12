import axios from "axios";
import logger from "./logService";

const tokenKey = "token";
const AuthorizationKey = "Authorization";

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://ultimatezap.com.br';

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.error(error);
    //toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwtfromLocalStorage() {
  const jwt = localStorage.getItem(tokenKey);
  axios.defaults.headers.common[AuthorizationKey] = "Bearer " + jwt;
}

function setJwt(jwt) {
  axios.defaults.headers.common[AuthorizationKey] = "Bearer " + jwt;
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function setBearerAuthorization(jwt) {
  axios.defaults.headers.common[AuthorizationKey] = "Bearer " + jwt;
}

function addBearerAuthorization() {
  axios.defaults.headers.common[AuthorizationKey] = "Bearer " + getJwt();
}

function removeBearerAuthorization() {
  delete axios.defaults.headers.common[AuthorizationKey];
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  fetch: axios.fetch,
  setJwt,
  setJwtfromLocalStorage,
  addBearerAuthorization,
  setBearerAuthorization,
  removeBearerAuthorization,
};