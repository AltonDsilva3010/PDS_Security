
import {createSlice} from "@reduxjs/toolkit"

export const exampleSlice = createSlice({
    name :"example",
    initialState : {
        data : null,
    },
    reducers:{
        setData : (state,actions)=>{
            state.data = actions.payload 
        },
    }
})

export const {setData} = exampleSlice.actions

export default exampleSlice.reducers
