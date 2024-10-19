import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        users : [],
        currentUser : null,
        loading: false,
        error: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        fetchUsersSuccess:(state, action)=>{
            state.users = action.payload,
            state.loading = false,
            state.error = false,
            state.currentUser = null
        }, 
        fetchUsersFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        },
        updateUserFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        },
        deleteUserFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }   
    }
})

export const { fetchUsersFailure, fetchUsersSuccess, updateUserFailure,updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } = adminSlice.actions;

export default adminSlice.reducer;