import { CustomError } from "./index.js";

// Function to validate required fields
const validateRequiredFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || !value.trim()) {
      throw new CustomError(`All fields are required and cannot be empty`, 400);
    }
  }
};

// Function to validate email and password for spaces
const validateNoSpaces = (email, password) => {
  if (/\s/.test(email) || /\s/.test(password)) {
    throw new CustomError("Email and password cannot contain spaces", 400);
  }
};

// Function to handle validation
export const validateUserInput = (email, password, name) => {
  // Validate required fields
  validateRequiredFields({ email, password, name });

  // Validate no spaces in email and password
  validateNoSpaces(email, password);
};
