import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showToast } from "../utils/toastUtils";
import { Spinner } from "../components";
const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !email) {
      return showToast("All fields are required", "error");
    }

    setIsLoading(true);

    try {
      const result = await registerUser({ name, email, password });

      showToast(result);
    } catch (error) {
      showToast(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center py-8 w-[90vw] max-w-[1120px] mx-auto">
      <form
        className="w-[90vw] max-w-[400px] bg-white rounded-md shadow-md p-8 mb-12"
        onSubmit={handleSubmit}
      >
        <h5 className="text-center text-lg font-normal capitalize tracking-wide mb-6">
          Register
        </h5>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm mb-2 capitalize tracking-wide"
          >
            name
          </label>
          <input
            type="text"
            className="w-full p-2.5 rounded-md bg-[#f8fafc] border border-[#e2e8f0] text-gray-900 placeholder-gray-400"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            htmlFor="email"
            className="block text-sm mb-2 capitalize tracking-wide"
          >
            password
          </label>
          <input
            type="password"
            className="w-full p-2.5 rounded-md bg-[#f8fafc] border border-[#e2e8f0] text-gray-900 placeholder-gray-400"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#645cff] text-white rounded-md p-2.5 text-sm capitalize tracking-wide shadow-sm transition duration-300 hover:bg-[#3c3799] hover:shadow-md flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Register"}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
