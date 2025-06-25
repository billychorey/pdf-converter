// 📁 src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, setIsLoggedIn, setMessage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage("You've been logged out.");
    navigate('/');
  };

  if (!isLoggedIn) return null; // Hide nav unless logged in

  return (
    <nav className="bg-background shadow p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">PDF Converter</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/about" className="text-blue-600 hover:underline">About</Link>
          <button onClick={handleLogout} className="text-red-600 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
