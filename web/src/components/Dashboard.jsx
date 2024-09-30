
import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import ProfilePhoto from '../assets/images/ngo3.png'; 
import Community from '../components/Dashboard-Features/Community';
import Market from './Dashboard-Features/Market';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import Projects from './Project/Projects';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const {authUser} = useAuthContext();

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    // Placeholder for logout logic or navigation if needed
    try{
      const response = await axios.post('http://localhost:4224/auth/logout');
      const data = response.data;
      if (data.error) throw new Error(data.error);
      navigate('/');
    }
    catch(err){
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
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }
  , [authUser.userId]);

  console.log(user.user);
  

  return (
    <div className="flex h-screen font-poppins">
      {/* Sidebar */}
      <div className="bg-primary text-white w-84 py-8 pl-8 flex flex-col justify-between relative">
        <div>
          <div className="flex items-center mb-10">
            <img src={Logo} alt="Logo" className="w-20 h-16" />
            <h1 className="text-2xl font-semibold font-poppins mr-8">
              ForACause
            </h1>
          </div>

          <nav className="space-y-5">
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
          <div className="flex items-center space-x-4 p-4 hover:bg-blue-400 cursor-pointer rounded-lg transition-colors mr-8">
            <img src={user.user?.primaryImage} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-lg font-medium font-poppins">{user.user?.name}</h3>
            </div>
          </div>

          <div
            className="mt-2 mr-8 py-4 px-6 text-lg bg-secondary text-primary font-poppins cursor-pointer text-center rounded-lg hover:bg-blue-200 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-blue-100 p-10 ">
        <h1 className="text-4xl font-poppins font-semibold text-primary mb-8">
          {activeSection === "overview" && "Dashboard Overview"}
          {activeSection === "marketplace" && "Market Place"}
          {activeSection === "community" && "Community"}
        </h1>

        <div>
          {(activeSection === "community" || activeSection === "community") && (
            <Community />
          )}
        </div>
        {activeSection === "marketplace" && <Market />}
        {activeSection === "projects" && <Projects />}
      </div>
    </div>
  );
};

const SidebarLink = ({ label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer flex items-center font-medium text-xl py-4 px-5 transition-colors duration-200
      ${isActive ? "bg-blue-100 text-blue-900" : "hover:bg-accent"}
    `}
    style={isActive ? { borderRadius: "40px 0px 0px 40px" } : {}}
  >
    {label}
  </div>
);

export default Dashboard;