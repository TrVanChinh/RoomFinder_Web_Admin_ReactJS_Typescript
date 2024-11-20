import { userService } from '../../services/user.service';
import { 
    loginUsersPagingRequest,
    loginUsersPagingSuccess, 
    loginUsersPagingFailure,
    addUserFailure,
    addUserRequest,
    addUserSuccess,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    getUserByIdRequest,
    getUserByIdSuccess,
    getUserByIdFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure
  } from './reducers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddUserRequest, IUserUpdatebyAdminRequest } from './types';
import { alertError, alertSuccess, clearAlert } from '../alert/reducers';
import { thunk } from 'redux-thunk';

export const loadUsersPaging = createAsyncThunk( 
    'user/loadUsersPaging',
    async ( { keyword, currentPage }: { keyword: string; currentPage: number } , thunkAPI) => {
      thunkAPI.dispatch(loginUsersPagingRequest());
      try {
        const response = await userService.getUsersPaging( keyword, currentPage)
        thunkAPI.dispatch(loginUsersPagingSuccess(response));
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Dispatch loginFailure action
        thunkAPI.dispatch(loginUsersPagingFailure({ error: errorMessage }));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  )

  export const loadUsersPagingByRole = createAsyncThunk( 
    'user/loadUsersPagingByRole',
    async ( { keyword, currentPage }: { keyword: number; currentPage: number } , thunkAPI) => {
      thunkAPI.dispatch(loginUsersPagingRequest());
      try {
        const response = await userService.getUsersPagingByRole( keyword, currentPage)
        thunkAPI.dispatch(loginUsersPagingSuccess(response));
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Dispatch loginFailure action
        thunkAPI.dispatch(loginUsersPagingFailure({ error: errorMessage }));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  )


  export const addUser = createAsyncThunk( 
    'user/addUser',
    async (  user: IUserUpdatebyAdminRequest  , thunkAPI) => {
      thunkAPI.dispatch(addUserRequest());
      try {
        await userService.addUser(user)
        thunkAPI.dispatch(addUserSuccess());
        thunkAPI.dispatch(alertSuccess({ message: 'Thêm người dùng thành công.' }))
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Dispatch loginFailure action
        thunkAPI.dispatch(addUserFailure({ error: errorMessage }));
        thunkAPI.dispatch(alertError({ message: 'Thêm người dùng thất bại.' }))
        return thunkAPI.rejectWithValue(errorMessage);
      }
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert())
      }, 3000)
    }
  )

  export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({id, user}:{id: string, user: IUserUpdatebyAdminRequest}, thunkAPI) => {
     
      try {
        thunkAPI.dispatch(updateUserRequest());
  
        await userService.updateUser(id, user);
  
        thunkAPI.dispatch(updateUserSuccess());
  
        thunkAPI.dispatch(alertSuccess({message: 'Cập nhật người dùng thành công'}));
  
        // history.push(UrlConstants.USERS_LIST);
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Dispatch loginFailure action
        thunkAPI.dispatch(updateUserFailure({ error: errorMessage }));
        thunkAPI.dispatch(alertError({ message: 'Cập nhật người dùng thất bại.' }))
        return thunkAPI.rejectWithValue(errorMessage);
      }
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
    
  });

  export const getUserById = createAsyncThunk(
    'user/updateUser',
    async (id: string, thunkAPI) => {
     
      try {
        thunkAPI.dispatch(getUserByIdRequest());
  
        const res = await userService.getUserById(id);
  
        thunkAPI.dispatch(getUserByIdSuccess({user: res}));

      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        // Dispatch loginFailure action
        thunkAPI.dispatch(getUserByIdFailure({ error: errorMessage }));
        return thunkAPI.rejectWithValue(errorMessage);
      }   
  });
  
  export const deleteUsers = createAsyncThunk('user/deleteUsers', 
    async( userIds: number[], thunkAPI) => {
      try {
        thunkAPI.dispatch(deleteUserRequest());
  
        await userService.deleteUser(userIds);
  
        thunkAPI.dispatch(deleteUserSuccess());
        thunkAPI.dispatch(loadUsersPaging({keyword : '', currentPage: 1}));
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        thunkAPI.dispatch(deleteUserFailure({ error: errorMessage }));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    })
