import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  async function logout() {
    const url = "https://secure-react-route.onrender.com/api/auth/logout";
    const response = await fetch(`${url}`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setUser(data.data);
      // navigate("/dashboard");
    }
  }
  const navigate = useNavigate();
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
            <button onClick={logout} className="text-red-500 hover:underline">
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
