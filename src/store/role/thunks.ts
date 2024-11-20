import { userService } from '../../services/user.service';
import { 
    getRoleRequest,
    getRoleFailure
  } from './reducers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRole } from './types';
import { alertError, alertSuccess, clearAlert } from '../alert/reducers';
import { thunk } from 'redux-thunk';

export const loadRole = createAsyncThunk( 
    'role/loadRole',
    async (_, thunkAPI) => {
      try {
        const response = await userService.getRole()
        thunkAPI.dispatch(getRoleRequest(response));
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Dispatch loginFailure action
        thunkAPI.dispatch(getRoleFailure({ error: errorMessage }));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  )