import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        users : [],
        userCount: 0,
       selectedUser : null,
        loading: false,
        error: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        fetchUsersStart:(state)=>{
            state.users = [];
            state.loading = true;
            state.error = false;
        },
        fetchUsersSuccess:(state, action)=>{
            state.users = action.payload,
            state.loading = false,
            state.error = false,
            state.selectedUser = null
        }, 
        fetchUsersFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        setUserCountSuccess:(state,action)=>{
            state.userCount = action.payload;
            state.error=false;
            state.loading=false;
        },
        fetchOneStart: (state)=>{
            state.loading = true;
            state.error = false;
        },
        fetchOneSuccess: (state, action)=>{
            state.selectedUser = action.payload;
            state.loading = false;
            state.error = false;
        }, 
        clearSelectedUser: (state)=>{
            state.selectedUser = null;
        },
        fetchOneFailure: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateDetailStart:(state, action)=>{
            state.loading = true;
            state.error = false;
        },
        updateDetailSuccess:(state,action)=>{
            state.selectedUser = action.payload,
            state.loading = false,
            state.error = false
        },
        updateDetailFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteDetailStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        deleteDetailSuccess:(state,action)=>{
            state.selectedUser = action.payload,
            state.loading = false,
            state.error = false
        },
        deleteDetailFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        searchStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        searchSuccess:(state)=>{
            state.selectedUser = null,
            state.loading = false,
            state.error = false
        },
        searchFailure:(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },        
        // unBlockHandleStart:(state)=>{
        //     state.loading = true;
        //     state.error = false;
        // },
        // unBlockHandleSuccess:(state, action)=>{
        //     state.selectedUser = action.payload,
        //     state.loading = false,
        //     state.error = false
        // },
        // unBlockHandlFailure:(state, action)=>{
        //     state.loading = false;
        //     state.error = action.payload;
        // } 
    }
})

export const {  fetchUsersStart, fetchUsersFailure, fetchUsersSuccess, fetchOneStart, fetchOneSuccess, fetchOneFailure, clearSelectedUser,setUserCountSuccess, updateDetailStart,updateDetailSuccess,updateDetailFailure, deleteDetailFailure, deleteDetailStart, deleteDetailSuccess } = adminSlice.actions;

export default adminSlice.reducer;