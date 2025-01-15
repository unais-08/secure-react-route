import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="font-mono text-4xl text-red-600">Error 404 Page</h1>
      <Link to="/" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Back Home
      </Link>
    </div>
  );
};

export default Error;
