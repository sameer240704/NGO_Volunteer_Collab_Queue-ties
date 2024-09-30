import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo_farm.png';
import farm2 from '../assets/images/farm2.png';
import { useAuthContext } from "../context/AuthContext.jsx";
import LanguageDropdown from "./LanguageDropdown.jsx";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password, language }),
      });
      const data = await response.json();
      // console.log(data.userId);
      if (data.error) throw new Error(data.error);
      localStorage.setItem("agro-user", JSON.stringify(data.userId));
      setAuthUser(data);
      // console.log(response.data);
      navigate("/dashboard");  // Redirect to the landing page
    } catch (error) {
      // Optionally, display more specific error messages
      console.error("Registration error:", error.response?.data || error.message);
      setError("Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-3xl font-medium mb-1">SignUp</h2>
            <form onSubmit={handleRegister} className="space-y-4 w-full">
              <div>
                <label htmlFor="fullName" className="block text-lg text-[#364423] mb-1">Full Name:</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-[#364423] rounded-xl focus:outline-none focus:border-green-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg text-[#364423] mb-1">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-[#364423] rounded-xl focus:outline-none focus:border-green-700"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-lg text-[#364423] mb-1">Phone:</label>
                <input
                  id="phone"
                  type="text"
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
              <div>
                <label htmlFor="language" className="block text-lg text-[#364423] mb-1">Language:</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                  className="w-full px-6 py-3 border-2 border-[#364423] rounded-xl focus:outline-none focus:border-green-700"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="text-xl w-full bg-[#dee8cf] text-[#364423] mt-8 px-6 py-3 rounded-full hover:bg-green-800 hover:text-white transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
            <p className="mt-4 text-[#364423]">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 hover:underline">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
