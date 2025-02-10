import React from 'react';
import { auth } from '../utils/firebase';  // Import auth from utils/firebase
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Profile.css';

const Profile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Logout logic (Firebase signOut, etc.)
    // For now just navigate to login
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {user ? (
        <div className="profile-info">
          <img
            src={user.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-details">
            <h2>{user.displayName || 'Anonymous'}</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>You need to log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
