import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import Community from '../components/Dashboard-Features/Community';
import Market from './Dashboard-Features/Market';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import Projects from './Project/Projects';
import ProfileDetails from './Dashboard-Features/ProfileDetails';
import Overview from './Dashboard-Features/Overview';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4224/auth/logout');
      const data = response.data;
      if (data.error) throw new Error(data.error);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4224/auth/getUser/${authUser.userId}`);
        const data = response.data;
        setUser(data);
        if (data.error) throw new Error(data.error);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }
, [authUser.userId]);

  return (
    <div className="min-h-screen flex font-harmonique bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Sidebar */}
      <div className="bg-primary fixed text-white w-84 py-8 pl-8 flex flex-col justify-between h-screen">
        <div>
          <div className="flex items-center mb-10">
            <img src={Logo} alt="Logo" className="w-20 h-16" />
            <h1 className="text-2xl font-semibold font-harmonique mr-8">
              ForACause
            </h1>
          </div>

          <nav className="space-y-4">
            <SidebarLink
              label="Overview"
              isActive={activeSection === "overview"}
              onClick={() => handleSectionClick("overview")}
            />
            <SidebarLink
              label="Market Place"
              isActive={activeSection === "marketplace"}
              onClick={() => handleSectionClick("marketplace")}
            />
            <SidebarLink
              label="Community"
              isActive={activeSection === "community"}
              onClick={() => handleSectionClick("community")}
            />
            <SidebarLink
              label="Projects"
              isActive={activeSection === "projects"}
              onClick={() => handleSectionClick("projects")}
            />
          </nav>
        </div>

        {/* Profile and Logout Section */}
        <div className="mt-auto">
          <div className="flex items-center space-x-4 p-4 hover:bg-blue-400 cursor-pointer rounded-lg transition-colors mr-8" onClick={() => handleSectionClick("profile")}>
            <img src={user.user?.primaryImage} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-lg font-medium font-harmonique">{user.user?.name}</h3>
            </div>
          </div>

          <div
            className="mt-2 mr-8 py-4 px-6 text-lg bg-secondary text-primary font-harmonique cursor-pointer text-center rounded-lg hover:bg-blue-200 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 pl-80 overflow-y-auto">
        <h1 className="text-4xl font- font-semibold text-primary mb-8">
          {activeSection === "overview" && "Dashboard Overview"}
          {activeSection === "marketplace" && "Market Place"}
          {activeSection === "community" && "Community"}
          {activeSection === "profile" && "Profile Details"}
        </h1>

        <div>
          {activeSection === "overview" && <Overview />}
          {activeSection === "community" && <Community />}
        </div>
        {activeSection === "marketplace" && <Market />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "profile" && <ProfileDetails user={user} onLogout={handleLogout} />}
      </div>
    </div>
  );
};

const SidebarLink = ({ label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer flex items-center font-medium text-xl py-4 px-5 transition-colors duration-200
      ${isActive ? "bg-[#cde3fe] text-blue-900" : "hover:bg-accent"}
    `}
    style={isActive ? { borderRadius: "40px 0px 0px 40px" } : {}}
  >
    {label}
  </div>
);

export default Dashboard;
