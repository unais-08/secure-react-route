import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = "https://auth-deploy-rf8o.onrender.com/api/auth/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    async function loginUser() {
      const response = await fetch(`${url}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data.data?.name);
      if (data.success) {
        setUser(data.data?.name);
        navigate("/dashboard");
      }
    }
    if (!password || !email) return;

    await loginUser();
  };
  return (
    <section className="flex justify-center items-center py-8 w-[90vw] max-w-[1120px] mx-auto">
      <form
        className="w-[90vw] max-w-[400px] bg-white rounded-md shadow-md p-8 mb-12"
        onSubmit={handleSubmit}
      >
        <h5 className="text-center text-lg font-normal capitalize tracking-wide mb-6">
          Login
        </h5>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm mb-2 capitalize tracking-wide"
          >
            email
          </label>
          <input
            type="email"
            className="w-full p-2.5 rounded-md bg-[#f8fafc] border border-[#e2e8f0] text-gray-900 placeholder-gray-400"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm mb-2 capitalize tracking-wide"
          >
            password
          </label>
          <input
            type="text"
            className="w-full p-2.5 rounded-md bg-[#f8fafc] border border-[#e2e8f0] text-gray-900 placeholder-gray-400"
            id="name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#645cff] text-white rounded-md p-2.5 text-sm capitalize tracking-wide shadow-sm transition duration-300 hover:bg-[#3c3799] hover:shadow-md"
        >
          login
        </button>
      </form>
    </section>
  );
};
export default LoginForm;
