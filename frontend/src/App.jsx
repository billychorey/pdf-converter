// 📁 src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Landing from './pages/Landing.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Message from './components/Message.jsx';

function App() {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : {};
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setMessage={setMessage}
      />
      {message && <Message message={message} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Landing
                users={users}
                setIsLoggedIn={setIsLoggedIn}
                setMessage={setMessage}
                isLoggedIn={isLoggedIn}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setMessage={setMessage}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPassword
              users={users}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
