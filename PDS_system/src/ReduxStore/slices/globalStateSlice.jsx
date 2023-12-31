
import { createSlice } from "@reduxjs/toolkit";

export const globalStateSlice = createSlice({
    name : "globlaStateSlice",
    initialState : {
        provider: null,
        signer: null,
        contract: null,
    },
    reducers : {
        setStateDetails : (state,action)=>{
            const data = action.payload;
            console.log(action)
            state.provider = data.provider,
            state.signer = data.signer,
            state.contract = data.contract
            console.log(state)
        }
    }
})

export const {setStateDetails} = globalStateSlice.actions

export default globalStateSlice.reducer