import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagination } from '../../helpers';
import { ReportRoomInfo, RoomInfo } from './types';

interface RoomsState {
    items: RoomInfo[];
    page: number;
    total: number;
    pageSize: number;
    loading: boolean;
    error: string | null;
    roomDetails: RoomInfo | null;
    reportRooms: ReportRoomInfo[];
}

const initialState: RoomsState = {
    items: [],
    page: 1,
    total: 0,
    pageSize: 0,
    loading: false,
    error: null,
    roomDetails: null,
    reportRooms: [], 
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        // Lấy danh sách phòng (phân trang)
        fetchRoomsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRoomsSuccess: (state, action: PayloadAction<IPagination<RoomInfo>>) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload.items;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
        fetchRoomsFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },

        // Lấy thông tin chi tiết phòng
        fetchRoomDetailsRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.roomDetails = null;
        },
        fetchRoomDetailsSuccess: (state, action: PayloadAction<RoomInfo>) => {
            state.loading = false;
            state.error = null;
            state.roomDetails = action.payload;
        },
        fetchRoomDetailsFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        updateRoomStatusRequest: (state) => { 
            state.loading = true;
        },
        updateRoomStatusSuccess: (state) => { 
            state.loading = false;
            state.error = null;
        },
        updateRoomStatusFailure: (state,  action: PayloadAction<{ error : string }>) => { 
            state.loading = false;
            state.error = action.payload.error;
        },
        fetchReportRoomsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchReportRoomsSuccess: (state, action: PayloadAction<IPagination<ReportRoomInfo>>) => {
            state.loading = false;
            state.error = null;
            state.reportRooms = action.payload.items;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
          },
             
        fetchReportRoomsFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        deleteRoomRequest: (state) => {
            state.loading = true;
        },
        deleteRoomSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        deleteRoomFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
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
} = roomSlice.actions;

export default roomSlice.reducer;
