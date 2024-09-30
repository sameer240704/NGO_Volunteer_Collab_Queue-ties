import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo.png';
import farm2 from '../assets/images/blue.jpg';
import { useAuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  
  const { setAuthUser } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = {
      email,
      password
    }
    try {
      // Send the FormData object in the POST request
      const response = await axios.post("http://localhost:4224/auth/login", 
        formData,
      );

      const data = response.data; // Accessing the data from the response
      if (data.error) throw new Error(data.error);

      localStorage.setItem("ngo-user", JSON.stringify(data.userId));
      setAuthUser(data);
      
      // Handle successful login
      navigate("/dashboard");  // Redirect to the landing page
    } catch (error) {
      // Update error message handling
      setError(error.response?.data?.error || "Invalid credentials, please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="relative h-screen bg-cover bg-center font-poppins" style={{ backgroundImage: `url(${farm2})` }}>
      <div className="fixed top-12 right-0 z-50"></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="flex items-center justify-center h-full px-4">

        <div className="absolute left-[15%] top-1/2 transform -translate-y-1/2 text-white max-w-lg">
          <p className="text-3xl mb-4 font-light leading-relaxed">
            ForACause platform empowers volunteers with tools to collaborate effectively, monitor their impact, and ensure transparency in all activities, making it easier to drive positive change in the community.
          </p>
        </div>

        <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-xl" style={{ marginLeft: '30%' }}>
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-28 -mt-5" />
            <h2 className="text-3xl font-medium mb-1">LogIn</h2>
            <form onSubmit={handleLogin} className="space-y-4 w-full">
              <div>
                <label htmlFor="email" className="block text-lg text-gray-700 mb-1">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg text-gray-700 mb-1">Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="text-xl w-full bg-blue-200 text-[#364423] mt-8 px-6 py-3 rounded-full hover:bg-primary hover:text-white transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-gray-700">
              Don't have an account?{" "}
              <a 
                href="/register" 
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
