import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
        loginRequest, 
        loginSuccess, 
        loginFailure, 
        logOut,  
        LOAD_CURRENT_LOGIN_USER_REQUEST, 
        LOAD_CURRENT_LOGIN_USER_SUCCESS, 
        LOAD_CURRENT_LOGIN_USER_FAILURE 
      } from './reducers';
import { userService } from '../../services/user.service';

export const loginUser = createAsyncThunk(
  'account/loginUser',
  async ({ email, matKhau }: { email: string; matKhau: string }, thunkAPI) => {
    thunkAPI.dispatch(loginRequest({ email, matKhau }));
    try {
      const response = await userService.login(email, matKhau);
      console.log("token....",response)
      thunkAPI.dispatch(loginSuccess({ token: response.token }));
      return response;
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      // Dispatch loginFailure action
      thunkAPI.dispatch(loginFailure({ error: errorMessage }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'account/logoutUser',
  async (_, thunkAPI) => {
    userService.logout();
    thunkAPI.dispatch(logOut());
  }
);

export const getCurrentLoginUser = createAsyncThunk( 
  'account/getCurrentLoginUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(LOAD_CURRENT_LOGIN_USER_REQUEST());
    try {
      const response = await userService.getCurrentLoginUser()
      thunkAPI.dispatch(LOAD_CURRENT_LOGIN_USER_SUCCESS({ user: response }));
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(LOAD_CURRENT_LOGIN_USER_FAILURE({ error: errorMessage }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)