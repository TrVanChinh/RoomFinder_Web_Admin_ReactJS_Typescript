import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertState } from './types';

const initialState: AlertState = {
  type: null,
  message: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alertSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.type = 'alert-success';
      state.message = action.payload.message;
    },
    alertError: (state, action: PayloadAction<{ message: string }>) => {
      state.type = 'alert-danger';
      state.message = action.payload.message;
    },
    clearAlert: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { alertSuccess, alertError, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
