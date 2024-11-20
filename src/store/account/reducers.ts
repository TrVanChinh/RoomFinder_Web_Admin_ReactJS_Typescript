import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountState, AuthenticatedUser} from './types';

const initialState: AccountState = { 
    user: null,
    loading: false,
    error: null,
    token: null,
    refreshToken: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<{ email: string; matKhau: string }>) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
            state.loading = false;
            state.token = action.payload.token;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.token = null;
            state.error = action.payload.error;
        },
        logOut: (state) => {
            state.token = null;
            state.error = null;
            state.user = null;
        },
        LOAD_CURRENT_LOGIN_USER_REQUEST: (state) => {
            state.loading = true; 
            
        },
        LOAD_CURRENT_LOGIN_USER_SUCCESS: (state, action: PayloadAction<{ user: AuthenticatedUser }>) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        LOAD_CURRENT_LOGIN_USER_FAILURE: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        refreshTokenRequest: (state) => {
            state.loading = true;
        },

        refreshTokenSuccess: (state, action: PayloadAction<{ token: string, refreshToken: string }>) => {
            state.loading = false;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },

        refreshTokenFailure: (state, action: PayloadAction<{ error: string }>)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
});

export const { 
    loginRequest, 
    loginSuccess, 
    loginFailure, 
    logOut, 
    LOAD_CURRENT_LOGIN_USER_REQUEST, 
    LOAD_CURRENT_LOGIN_USER_SUCCESS, 
    LOAD_CURRENT_LOGIN_USER_FAILURE,
    refreshTokenRequest, 
    refreshTokenSuccess, 
    refreshTokenFailure
} = accountSlice.actions; 

export default accountSlice.reducer;
