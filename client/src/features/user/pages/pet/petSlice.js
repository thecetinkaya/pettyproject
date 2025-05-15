// features/pets/petSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [
    {
      id: "1",
      name: "Bella",
      type: "Dog",
      breed: "Golden Retriever",
      age: 3,
      gender: "Female",
      image:
        "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
    },
    {
      id: "2",
      name: "Max",
      type: "Cat",
      breed: "Siamese",
      age: 2,
      gender: "Male",
      image: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
    },
  ],
};

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    addPet: (state, action) => {
      state.pets.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    updatePet: (state, action) => {
      const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
    },
  },
});

export const { addPet, updatePet } = petSlice.actions;
export default petSlice.reducer;
