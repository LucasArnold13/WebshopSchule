import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import customerReducer from "./slices/customerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    customer : customerReducer,
  },
});

export default store;
