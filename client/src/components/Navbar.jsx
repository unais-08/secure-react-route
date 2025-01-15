import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { showToast } from "../utils/toastUtils";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        showToast(result);
      } else {
        showToast({ message: "Logout failed", type: "error" });
      }
    } catch (error) {
      showToast({ message: "An error occurred during logout", type: "error" });
    }
  };
  return (
    <nav className="flex justify-center items-center p-3 font-mono text-xl">
      {!user ? (
        <>
          <div className="mr-5">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-purple-600" : "")}
            >
              Login
            </NavLink>
          </div>
          <div className="mr-5">
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "text-purple-600" : "")}
            >
              Register
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="mr-5">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-purple-600" : "")}
            >
              Home
            </NavLink>
          </div>
          <div className="mr-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "text-purple-600" : "")}
            >
              Dashboard
            </NavLink>
          </div>
          <div className="mr-5">
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "text-purple-600" : "")}
            >
              Products
            </NavLink>
          </div>
          <div className="mr-5">
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
