import React, { useState } from 'react';
import Logo from '../assets/images/logoimg.png';
import ProfilePhoto from '../assets/images/ngo3.png'; 
import Community from '../components/Dashboard-Features/Community';
import Market from './Dashboard-Features/Market';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Placeholder for logout logic or navigation if needed
    console.log("User logged out");
  };

  return (
    <div className="flex h-screen font-poppins">
      {/* Sidebar */}
      <div className="bg-primary text-white w-84 py-8 pl-8 flex flex-col justify-between relative">
        <div>
          <div className="flex items-center mb-10">
            <img src="" alt="Logo" className="w-20 h-16" />
            <h1 className="text-2xl font-semibold font-poppins mr-8">ForACause</h1>
          </div>

          <nav className="space-y-5">
            <SidebarLink
              label="Overview"
              isActive={activeSection === 'overview'}
              onClick={() => handleSectionClick('overview')}
            />
            <SidebarLink
              label="Market Place"
              isActive={activeSection === 'marketplace'}
              onClick={() => handleSectionClick('marketplace')}
            />
            <SidebarLink
              label="Community"
              isActive={activeSection === 'community'}
              onClick={() => handleSectionClick('community')}
            />
          </nav>
        </div>

        {/* Profile and Logout Section */}
        <div className="mt-auto">
          <div className="flex items-center space-x-4 p-4 hover:bg-[#c0d4ae] cursor-pointer rounded-lg transition-colors mr-8">
            <img src={ProfilePhoto} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-lg font-medium font-poppins">Aditi Ambasta</h3>
            </div>
          </div>

          <div
            className="mt-2 mr-8 py-4 px-6 text-lg bg-secondary text-[#1c280c] font-poppins cursor-pointer text-center rounded-lg hover:bg-[#b0c7a2] transition-colors"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-secondary p-10">
        <h1 className="text-4xl font-poppins font-semibold text-primary mb-8">
          {activeSection === 'overview' && 'Dashboard Overview'}
          {activeSection === 'marketplace' && 'Market Place'}
          {activeSection === 'community' && 'Community'}
        </h1>

          {(activeSection === 'marketplace') && <Market />}
        <div className="grid grid-cols-3 gap-6">
          {(activeSection === 'overview' || activeSection === 'community') && <Community />}
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer flex items-center font-medium text-xl py-4 px-6 transition-colors duration-200
      ${isActive ? 'bg-secondary text-blue-900' : 'hover:bg-accent'}
    `}
    style={isActive ? { borderRadius: '40px 0px 0px 40px' } : {}}
  >
    {label}
  </div>
);

export default Dashboard;
