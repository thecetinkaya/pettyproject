import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
