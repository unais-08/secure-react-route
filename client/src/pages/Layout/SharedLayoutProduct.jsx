import { Outlet } from "react-router-dom";

const SharedLayoutProduct = () => {
  return (
    <>
      <h1 className="font-mono text-4xl mb-10 text-center text-gray-800">
        Products Page
      </h1>
      <Outlet />
    </>
  );
};

export default SharedLayoutProduct;
