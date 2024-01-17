
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : "userSlice",
    initialState : {
        address : null
    },
    reducers : {
        setUserDetails : (state,action)=>{
            const data = action.payload;
            console.log(action)
            state.address = data.user.address,
            console.log(state)
        }
    }
})

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer