import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/index";
const SharedLayout = ({user ,setUser}) => {
  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <Outlet />
    </>
  );
};

export default SharedLayout;
