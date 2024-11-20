import { AppDispatch } from '../../store';
import { alertSuccess, alertError, clearAlert } from './reducers';

// Thunk action creator để dispatch alertSuccess
export const showAlertSuccess = (message: string) => (dispatch: AppDispatch) => {
  dispatch(alertSuccess({ message }));
};

// Thunk action creator để dispatch alertError
export const showAlertError = (message: string) => (dispatch: AppDispatch) => {
  dispatch(alertError({ message }));
};

// Thunk action creator để dispatch clearAlert
export const clearAlertMessage = () => (dispatch: AppDispatch) => {
  dispatch(clearAlert());
};
