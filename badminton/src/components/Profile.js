import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile = () => {
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login'); // Use navigate() to redirect to the login page
  };

  return (
    <div>
      <h2>Profile</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
