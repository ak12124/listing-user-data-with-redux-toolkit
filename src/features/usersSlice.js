import { createSlice } from "@reduxjs/toolkit";




const initialState = [];


export const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        addUser:(state, action)=>{
            state.push(action.payload);
        },
        removeUser:(state,action)=>{
            let id = action.payload;
            return state.filter((elem,i)=>i!==id);   
        },
    }
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;