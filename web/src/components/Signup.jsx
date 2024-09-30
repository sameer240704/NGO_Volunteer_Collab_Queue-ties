import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo.png';
import farm2 from '../assets/images/blue.jpg';
import { useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Register = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    language: "en",
    role: "admin",
    address1: "",
    address2: "",
    city: "",
    state: "",
  });
  const [primaryImage, setPrimaryImage] = useState(null);
  const [ngoImages, setNgoImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (formData.role === "volunteer") {
      setPrimaryImage(e.target.files[0]);
    } else {
      setNgoImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      console.log(formData.role);
      
      if (formData.role === "volunteer" && primaryImage) {
        submitData.append("primaryImage", primaryImage);
      } else if (formData.role === "admin" && ngoImages.length > 0) {
        ngoImages.forEach((image, index) => {
          submitData.append(`ngoImages`, image); // Adjusting for the correct field name
        });
      }

      
      
      const response = await axios.post("http://localhost:4224/auth/register", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      const data = response.data; // Axios response handling
      console.log(data);
      if (data.error) throw new Error(data.error);
      localStorage.setItem("ngo-user", JSON.stringify(data.userId));
      setAuthUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError("Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
    navigate("/dashboard");
  };


  const renderPage1 = () => (
    <>
      <div>
        <label className="block text-lg text-gray-700 mb-1">User Type:</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="volunteer"
              checked={formData.role === "volunteer"}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Volunteer</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">NGO</span>
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="name" className="block text-lg text-gray-700 mb-1">
          {formData.role === "volunteer" ? "Full Name:" : "NGO Name:"}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg text-gray-700 mb-1">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-lg text-gray-700 mb-1">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-lg text-gray-700 mb-1">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => setPage(2)}
          className="text-xl w-full bg-blue-200 text-gray-700 mt-8 px-6 py-3 rounded-full hover:bg-blue-800 hover:text-white transition duration-200"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderPage2 = () => (
    <>
      {formData.role === "admin" && (
        <>
          <div>
            <label htmlFor="address1" className="block text-lg text-gray-700 mb-1">Address Line 1:</label>
            <input
              id="address1"
              name="address1"
              type="text"
              value={formData.address1}
              onChange={handleChange}
              required={formData.role === "admin"}
              className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
            />
          </div>
          <div>
            <label htmlFor="address2" className="block text-lg text-gray-700 mb-1">Address Line 2:</label>
            <input
              id="address2"
              name="address2"
              type="text"
              value={formData.address2}
              onChange={handleChange}
              className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
            />
          </div>
            </>
          )}
          <div>
            <label htmlFor="city" className="block text-lg text-gray-700 mb-1">City:</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-lg text-gray-700 mb-1">State:</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
            />
          </div>
      <div>
        <label htmlFor="image" className="block text-lg text-gray-700 mb-1">
          {formData.role === "volunteer" ? "Upload Image:" : "Upload Images:"}
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple={formData.role === "admin"}
          required
          className="w-full px-6 py-3 border-2 border-primary rounded-xl focus:outline-none focus:border-blue-700"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setPage(1)}
          className="text-xl w-1/2 bg-gray-300 text-gray-700 mt-8 px-6 py-3 rounded-full hover:bg-gray-400 transition duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="text-xl w-1/2 bg-blue-200 text-gray-700 mt-8 px-6 py-3 rounded-full hover:bg-blue-800 hover:text-white transition duration-200"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </>
  );  

  return (
    <div className="relative min-h-screen bg-cover bg-center font-poppins" style={{ backgroundImage: `url(${farm2})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-28 -mt-5" />
            <h2 className="text-3xl font-medium mb-1">SignUp</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {page === 1 ? renderPage1() : renderPage2()}
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
            <p className="mt-4 text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;