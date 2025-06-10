// 📁 src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, setIsLoggedIn, setMessage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage('You\'ve been logged out.');
    navigate('/');
  };

  if (!isLoggedIn) return null; // hide nav entirely unless logged in

  return (
    <nav style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
      <button onClick={handleLogout}>Sign Out</button>
    </nav>
  );
}

export default NavBar;
