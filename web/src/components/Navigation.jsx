import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const Navigation = () => {
  return (
    <header className="bg-secondary py-4 -mt-40 mb-28">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-20 -mr-3" />
          <span className="text-3xl font-mono font-semibold text-primary pr-4">ForACause</span>
        </div>

        {/* Navigation Links */}
        <nav className="">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-lg font-harmonique text-black hover:text-blue-800">Home</Link></li>
            <li><Link to="/dashboard" className="text-lg font-harmonique text-black hover:text-blue-800">Dashboard</Link></li>
            <li><Link to="/services" className="text-lg font-harmonique text-black hover:text-blue-800">Services</Link></li>
            <li><Link to="/about" className="text-lg font-harmonique text-black hover:text-blue-800">About Us</Link></li>
            <li><Link to="/faqs" className="text-lg font-harmonique text-black hover:text-blue-800">FAQs</Link></li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-primary font-harmonique text-lg text-white px-8 py-3 rounded-full hover:bg-blue-800 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-[#dfeaf8] font-harmonique text-lg text-black px-8 py-3 rounded-full hover:bg-[#d1d2c0] transition duration-300">
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
