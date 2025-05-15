import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vets: [
    {
      id: 1,
      name: "Dr. Ahmet Yılmaz",
      specialization: "Kedi Hastalıkları",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      availableSlots: ["09:00", "11:00", "14:00", "16:00"],
    },
    // Diğer veterinerler...
  ],
  status: "idle",
  error: null,
};

const vetSlice = createSlice({
  name: "vets",
  initialState,
  reducers: {},
});

export default vetSlice.reducer;
