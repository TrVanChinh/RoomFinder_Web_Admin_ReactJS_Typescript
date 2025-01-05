import { roomService } from '../../services/room.service';
import { 
  fetchRoomsRequest,
  fetchRoomsSuccess,
  fetchRoomsFailure,
  fetchRoomDetailsRequest,
  fetchRoomDetailsSuccess,
  fetchRoomDetailsFailure,
  } from './reducers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { alertError, alertSuccess, clearAlert } from '../alert/reducers';
import { thunk } from 'redux-thunk';


export const loadRoomsPaging = createAsyncThunk( 
  'room/loadRoomsPaging',
  async ( { keyword, currentPage }: { keyword: string; currentPage: number } , thunkAPI) => {
    thunkAPI.dispatch(fetchRoomsRequest());
    try {
      const response = await roomService.getRoomsPaging( keyword, currentPage)
      thunkAPI.dispatch(fetchRoomsSuccess(response));
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(fetchRoomsFailure({ error: errorMessage }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

export const loadRoomsPagingByType = createAsyncThunk( 
  'room/loadRoomsPagingByType',
  async ( { keyword, currentPage }: { keyword: number; currentPage: number } , thunkAPI) => {
    thunkAPI.dispatch(fetchRoomsRequest());
    try {
      const response = await roomService.getRoomsPagingByType( keyword, currentPage)
      thunkAPI.dispatch(fetchRoomsSuccess(response));
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(fetchRoomsFailure({ error: errorMessage }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)