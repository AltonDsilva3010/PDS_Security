
import {configureStore} from "@reduxjs/toolkit"
import exampleSliceReducer  from "./slices/example"
import  globalStateSlice  from "./slices/globalStateSlice"

export default configureStore({
    reducer : {
        // example : exampleSliceReducer,
        globlaStateSlice : globalStateSlice
    }
})

