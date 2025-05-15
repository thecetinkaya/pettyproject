import { configureStore } from "@reduxjs/toolkit";
import petReducer from "../features/user/pages/pet/petSlice";
import vetReducer from "../features/user/pages/appointment/vetSlice";
import userReducer from "../features/auth/UserSlice";
import appointmentReducer from "../features/user/pages/appointment/appointmentSlice";

export const store = configureStore({
  reducer: {
    pets: petReducer,
    user: userReducer,
    appointments: appointmentReducer,
    vets: vetReducer,
  },
});

export default store;
