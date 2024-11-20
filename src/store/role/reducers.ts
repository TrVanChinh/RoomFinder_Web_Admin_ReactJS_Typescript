import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RoleState, IRole} from './types';

const initialState: RoleState = { 
    items: [],
    loading: false,
    error: null,
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        getRoleRequest: (state, action: PayloadAction<IRole[]>) => { 
            state.loading = true;
            state.items = action.payload
        },
        getRoleFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
});

export const { 
    getRoleRequest, 
    getRoleFailure,
} = roleSlice.actions; 

export default roleSlice.reducer;