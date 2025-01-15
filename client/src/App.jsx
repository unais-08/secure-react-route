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
} from "./pages";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const url = "https://secure-react-route.onrender.com/api/auth/check-auth";
  useEffect(() => {
    async function checkAuth() {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.data.name);
        navigate("/dashboard");
      }
      console.log("Auth check failed");
    }
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout user={user} setUser={setUser} />}>
        <Route
          index
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<RegisterForm setUser={setUser} />} />
        <Route path="login" element={<LoginForm setUser={setUser} />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="products" element={<SharedLayoutProduct />}>
          <Route
            index
            element={
              <ProtectedRoute user={user}>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path=":productId"
            element={
              <ProtectedRoute user={user}>
                <SingleProduct />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
