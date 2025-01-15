import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Error,
  Home,
  Products,
  ProtectedRoute,
  SharedLayout,
  SharedLayoutProduct,
  SingleProduct,
  RegisterForm,
  LoginForm,
  GuestRoute,
} from "./pages";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import Spinner from "./components/Spinner"; // Import your spinner component

const App = () => {
  const { loggedUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      setIsLoading(true);
      try {
        const result = await loggedUser();
        console.log(result);
      } catch (error) {
        console.error("Error checking logged in user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoggedInUser();
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner /> {/* Render the spinner while loading */}
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <GuestRoute>
                <RegisterForm />
              </GuestRoute>
            }
          />
          <Route
            path="login"
            element={
              <GuestRoute>
                <LoginForm />
              </GuestRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="products" element={<SharedLayoutProduct />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path=":productId"
              element={
                <ProtectedRoute>
                  <SingleProduct />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
