// trainerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    city: "",
  },
  errors: {},
};

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetTrainerState: (state) => {
      state.formData = initialState.formData;
      state.errors = initialState.errors;
    },
    // Add other actions if needed
  },
});

export const { setFormData, setErrors, resetTrainerState } = trainerSlice.actions;

export default trainerSlice.reducer;
