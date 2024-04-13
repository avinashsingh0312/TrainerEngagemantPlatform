// trainerActions.js
import { setFormData, setErrors, resetTrainerState } from "../reducers/TrainerRegister";

export const registerTrainer = (formData) => async (dispatch) => {
  try {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      const response = await fetch("http://localhost:3001/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        dispatch(resetTrainerState());
        // alert("Registered Successfully!!!");
        console.log("Trainer registered successfully");
        // Optionally, you can dispatch other actions or perform additional logic here
      } else {
        throw new Error("Failed to register trainer");
      }
    } else {
      dispatch(setErrors(validationErrors));
    }
  } catch (error) {
    console.error("Error registering trainer:", error);
  }
};

const validateForm = (data) => {
  const errors = {};
  // Implement your form validation logic here
  // Example:
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (!data.password || data.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  // Add more validation rules as needed
  return errors;
};
