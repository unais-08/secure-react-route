import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/index";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
