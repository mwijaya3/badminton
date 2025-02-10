import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <header className="relative p-4 bg-gray-800 text-white">
  {/* Login and Sign Up buttons at top right */}
  <div className="absolute top-4 right-4 space-x-4">
    <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
      Login
    </Link>
    <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
      Sign Up
    </Link>
  </div>

  {/* Centering the Badminton Web App title */}
        <h1 className="text-2xl font-bold text-center mx-auto">
          Badminton Web App
        </h1>
</header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/badminton" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
