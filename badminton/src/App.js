import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </Router>
  );
};

export default App;
