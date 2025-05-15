import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  status: "idle",
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(
        (app) => app.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (app) => app.id !== action.payload
      );
    },
  },
});

export const { addAppointment, updateAppointment, deleteAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
