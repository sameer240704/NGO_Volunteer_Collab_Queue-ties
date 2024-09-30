import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Projects from "./components/Project/Projects.jsx";
import Chatbot from './components/ChatBot';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <div className="bg-secondary min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {<Route path="/login" element={<Login />} />}
          <Route path="/register" element={<Signup />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;