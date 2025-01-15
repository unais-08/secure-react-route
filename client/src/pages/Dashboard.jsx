const Dashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="font-mono text-4xl text-center text-gray-800">
          Dashboard Page {user}
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
