import { UsersState, IUser } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagination } from '../../helpers';


const initialState: UsersState = {
    items: [],
    page: 1,
    total: 0,
    pageSize: 0,
    loading: false,
    deteledCount: 0,
    error: null,
    editUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUsersPagingRequest: (state) => {
            state.loading = true;
        },
        loginUsersPagingSuccess: (state, action: PayloadAction<IPagination<IUser>>) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload.items;  // Lấy items từ IPagination<IUser>
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
        loginUsersPagingFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },

        addUserRequest: (state) => {
            state.loading = true;
        },
        addUserSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        addUserFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        getUserByIdRequest: (state) => { 
            state.loading = true;
        },
        getUserByIdSuccess: (state, action: PayloadAction<{ user: IUser }>) => { 
            state.editUser = action.payload.user;
            state.loading = false;
            state.error = null;
        },
        getUserByIdFailure: (state, action: PayloadAction<{ error : string }>) => { 
            state.error = action.payload.error;
            state.loading = false;
        },
        updateUserRequest: (state) => { 
            state.loading = true;
        },
        updateUserSuccess: (state) => { 
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state,  action: PayloadAction<{ error : string }>) => { 
            state.loading = false;
            state.error = action.payload.error;
        },
        deleteUserRequest: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});




export const { 
        loginUsersPagingRequest, 
        loginUsersPagingSuccess, 
        loginUsersPagingFailure, 
        addUserRequest, 
        addUserSuccess, 
        addUserFailure,
        getUserByIdRequest, 
        getUserByIdSuccess, 
        getUserByIdFailure,
        updateUserRequest,
        updateUserSuccess, 
        updateUserFailure,
        deleteUserFailure,
        deleteUserRequest,
        deleteUserSuccess,
    } = userSlice.actions;

export default userSlice.reducer;