import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaCalendarAlt, FaSignInAlt, FaIdBadge } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { _id, name, email, createdAt, lastLogin } = user;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-mono text-4xl text-center text-gray-800 mb-6">
          Dashboard Page
        </h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaIdBadge className="text-gray-700 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">User ID:</h2>
          </div>
          <p className="text-gray-600 ml-8">{_id}</p>
          
          <div className="flex items-center">
            <FaUser className="text-gray-700 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Name:</h2>
          </div>
          <p className="text-gray-600 ml-8">{name}</p>
          
          <div className="flex items-center">
            <FaEnvelope className="text-gray-700 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Email:</h2>
          </div>
          <p className="text-gray-600 ml-8">{email}</p>
          
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-700 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Created At:</h2>
          </div>
          <p className="text-gray-600 ml-8">{new Date(createdAt).toLocaleString()}</p>
          
          <div className="flex items-center">
            <FaSignInAlt className="text-gray-700 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Last Login:</h2>
          </div>
          <p className="text-gray-600 ml-8">{new Date(lastLogin).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
