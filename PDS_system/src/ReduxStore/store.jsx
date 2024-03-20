import { configureStore } from "@reduxjs/toolkit";
import exampleSliceReducer from "./slices/example";
import globalStateSlice from "./slices/globalStateSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: {
    // example : exampleSliceReducer,
    globlaStateSlice: globalStateSlice,
    userSlice: userSlice,
  },
});
