
import {configureStore} from "@reduxjs/toolkit"
import exampleSliceReducer  from "./slices/example"
export default configureStore({
    reducer : {
        example : exampleSliceReducer
    }
})