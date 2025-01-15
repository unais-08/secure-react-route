import { createContext, useState } from "react";

export const AuthContext = createContext("");

const API_BASE_URL = "https://secure-react-route.onrender.com/api/auth";
//  "http://localhost:8080/api/auth";
console.log(API_BASE_URL);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data); // Only store non-sensitive user data
        return { success: true, message: "Registration successful!" };
      }

      return {
        success: false,
        message: data.message || "Registration failed.",
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data); // Only store non-sensitive user data
        return { success: true, message: "Login successful!" };
      }

      return {
        success: false,
        message: data.message || "Login failed.",
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        return { success: true, message: "Logout successful!" };
      }

      const data = await response.json();
      return {
        success: false,
        message: data.message || "Logout failed.",
      };
    } catch (error) {
      console.error("Error logging out user:", error);
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  };

  const loggedUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data); // Only store non-sensitive user data
        return { success: true, message: "Authenticated!" };
      }

      return {
        success: false,
        message: data.message || "Authentication failed.",
      };
    } catch (error) {
      console.error("Error checking user authentication:", error);
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logoutUser, loggedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
