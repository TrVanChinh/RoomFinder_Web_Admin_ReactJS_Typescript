import { response } from 'express';
import axios  from "axios";
import env from "react-dotenv"
import { UrlConstants } from '../constans';
import { AppState, store } from '../store';
import { logoutUser } from '../store/account/thunks';
import { 
    refreshTokenFailure,
    refreshTokenRequest,
    refreshTokenSuccess
  } from '../store/account/reducers';


const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
        },
})


api.interceptors.response.use(
    (res) => res,
    (err) => {
      const originalRequest = err.config;
      const currentState = store.getState() as AppState;
      const refreshToken = currentState.account.refreshToken;
      // Prevent infinite loops
      if (
        err.response.status === 401 &&
        originalRequest.url === `${env.API_URL}/api/v1/auth/refresh-token/`
      ) {
        // history.push(UrlConstants.LOGIN);
        return Promise.reject(err);
      }
  
      if (
        err.response.data.message === 'Token is expired' &&
        err.response.status === 401 &&
        err.response.statusText === 'Unauthorized'
      ) {
        if (refreshToken) {
          store.dispatch(refreshTokenRequest());
          return api
            .post('/v1/auth/refresh-token', { refreshToken })
            .then((response) => {
              store.dispatch(
                refreshTokenSuccess({
                  token: response.data.token,
                  refreshToken: response.data.refreshToken,
                })
              );
              api.defaults.headers.common['x-auth-token'] = response.data.token;
              originalRequest.headers['x-auth-token'] = response.data.token;
              return api(originalRequest);
            })
            .catch((err) => {
              store.dispatch(
                refreshTokenFailure({
                  error: err.toString(),
                })
              );
              console.log(err);
            });
        } else {
          console.log('Refresh token not available.');
        //   history.push(UrlConstants.LOGIN);
        }
      }
  
      return Promise.reject(err);
    }
  );

  export { api };