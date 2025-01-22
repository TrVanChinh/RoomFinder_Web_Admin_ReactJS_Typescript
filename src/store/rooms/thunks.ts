import { roomService } from '../../services/room.service';
import { 
  fetchRoomsRequest,
  fetchRoomsSuccess,
  fetchRoomsFailure,
  fetchRoomDetailsRequest,
  fetchRoomDetailsSuccess,
  fetchRoomDetailsFailure,
  updateRoomStatusRequest,
  updateRoomStatusSuccess,
  updateRoomStatusFailure,
  fetchReportRoomsRequest,
  fetchReportRoomsSuccess,
  fetchReportRoomsFailure,
  deleteRoomRequest,
  deleteRoomSuccess,
  deleteRoomFailure,
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
  async ( { roomTypeId, roomStatus, currentPage }: { roomTypeId: number | null, roomStatus: string | null; currentPage: number } , thunkAPI) => {
    thunkAPI.dispatch(fetchRoomsRequest());
    try {
      const response = await roomService.getRoomsPagingByType( roomTypeId, roomStatus, currentPage)
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

export const getRoomById = createAsyncThunk( 
  'room/getRoomById',
  async (  roomId: string , thunkAPI) => {
    thunkAPI.dispatch(fetchRoomDetailsRequest());
    try {
      const response = await roomService.getRoomById( roomId)
      thunkAPI.dispatch(fetchRoomDetailsSuccess(response));
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(fetchRoomDetailsFailure({ error: errorMessage }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

export const updateRoomStatus = createAsyncThunk( 
  'room/updateStatus',
  async ( { roomId, roomStatus }: { roomId: string; roomStatus: string } , thunkAPI) => {
    thunkAPI.dispatch(updateRoomStatusRequest());
    try {
      const response = await roomService.updateStatus(roomId, roomStatus)
      thunkAPI.dispatch(updateRoomStatusSuccess());
      thunkAPI.dispatch(alertSuccess({message: 'Cập nhật trạng thái phòng thành công'}));

    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(updateRoomStatusFailure({ error: errorMessage }));
      thunkAPI.dispatch(alertError({message: 'Cập nhật trạng thái phòng thất bại'}));

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

export const approveRoom = createAsyncThunk( 
  'room/rejectRoom',
  async (  roomId: string  , thunkAPI) => {
    thunkAPI.dispatch(updateRoomStatusRequest());
    try {
      const response = await roomService.approveRoom(roomId)
      thunkAPI.dispatch(updateRoomStatusSuccess());
      thunkAPI.dispatch(alertSuccess({message: 'Duyệt phòng thành công'}));

    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(updateRoomStatusFailure({ error: errorMessage }));
      thunkAPI.dispatch(alertError({message: 'Duyệt phòng thất bại'}));

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

export const rejectRoom = createAsyncThunk( 
  'room/rejectRoom',
  async ( { roomId, reason }: { roomId: string; reason: string } , thunkAPI) => {
    thunkAPI.dispatch(updateRoomStatusRequest());
    try {
      const response = await roomService.rejectRoom(roomId, reason)
      thunkAPI.dispatch(updateRoomStatusSuccess());
      // thunkAPI.dispatch(alertSuccess({message: 'Từ chối phòng thành công'}));

    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Dispatch loginFailure action
      thunkAPI.dispatch(updateRoomStatusFailure({ error: errorMessage }));
      // thunkAPI.dispatch(alertError({message: 'Cập nhật trạng thái phòng thất bại'}));

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

export const loadReportRoomsPaging = createAsyncThunk(
  'room/loadReportRoomsPaging',
  async (
    { currentPage }: { currentPage: number },
    thunkAPI
  ) => {
    thunkAPI.dispatch(fetchReportRoomsRequest());
    try {
      const response = await roomService.getReportRoomsPaging(currentPage);
      thunkAPI.dispatch(fetchReportRoomsSuccess(response)); 
      return response; 
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      thunkAPI.dispatch(fetchReportRoomsFailure({ error: errorMessage }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
  
);

export const deleteRoom = createAsyncThunk('room/delete', 
    async( ids: string[], thunkAPI) => {
      try {
        thunkAPI.dispatch(deleteRoomRequest());
  
        await roomService.deleteRoom(ids);
  
        thunkAPI.dispatch(deleteRoomSuccess());
        thunkAPI.dispatch(loadRoomsPagingByType({roomTypeId: null, roomStatus: '', currentPage: 1}));
      } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        thunkAPI.dispatch(deleteRoomFailure({ error: errorMessage }));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    })