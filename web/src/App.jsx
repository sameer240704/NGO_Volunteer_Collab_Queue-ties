import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Chatbot from './components/ChatBot';

const App = () => {
  return (
    <Router>
      <div className="bg-secondary min-h-screen"> {/* Set background color here */}
        {/* <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes> */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
