import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo_farm.png';
import farm2 from '../assets/images/farm2.png';
import { useAuthContext } from "../context/AuthContext.jsx";
import LanguageDropdown from "./LanguageDropdown.jsx";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  
  const { setAuthUser } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      
      const data = await response.json();
      // console.log(data.userId);
      if (data.error) throw new Error(data.error);
      localStorage.setItem("agro-user", JSON.stringify(data.userId));
      setAuthUser(data);
      // Handle successful login
      navigate("/dashboard");  // Redirect to the landing page
    } catch (error) {
      setError("Invalid credentials, please try again: ", error.response);
    }
    setLoading(false);
  };

  return (
    <div className="relative h-screen bg-cover bg-center font-poppins" style={{ backgroundImage: `url(${farm2})` }}>
      <div className="fixed top-12 right-0 z-50">
        <LanguageDropdown />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="flex items-center justify-center h-full px-4">

        <div className="absolute left-[15%] top-1/2 transform -translate-y-1/2 text-white max-w-lg">
          <p className="text-3xl mb-4 font-light leading-relaxed">
            Welcome to Krishak Saathi, your ultimate companion for agricultural success. Our platform offers
            innovative solutions to help farmers maximize their productivity and achieve their goals.
          </p>
        </div>

        <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-xl" style={{ marginLeft: '30%' }}>
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-28 -mt-5" />
            <h2 className="text-3xl font-medium mb-1">LogIn</h2>
            <form onSubmit={handleLogin} className="space-y-4 w-full">
              <div>
                <label htmlFor="phone" className="block text-lg text-[#364423] mb-1">Phone:</label>
                <input
                  id="phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-[#364423] rounded-xl focus:outline-none focus:border-green-700"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg text-[#364423] mb-1">Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-[#364423] rounded-xl focus:outline-none focus:border-green-700"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="text-xl w-full bg-[#dee8cf] text-[#364423] mt-8 px-6 py-3 rounded-full hover:bg-green-800 hover:text-white transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-[#364423]">
              Don't have an account?{" "}
              <a 
                href="/register" 
                className="text-green-600 hover:underline"
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
