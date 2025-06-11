import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setMessage, setIsLoggedIn, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false); // <-- toggles login view
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setMessage('Account created! Redirecting to dashboard...');
        navigate('/dashboard');
      } else if (response.status === 409) {
        setMessage('User already exists. Please log in.');
        setShowLogin(true); // 🔁 show login instead of register
      } else {
        const data = await response.json();
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Error creating account.');
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      setMessage('Error logging in.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>{showLogin ? 'Log In' : 'Create Account'}</h1>
      <form onSubmit={showLogin ? handleLogin : handleRegister}>
        <label>Username:</label><br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />

        {!showLogin && (
          <>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />
          </>
        )}

        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">{showLogin ? 'Log In' : 'Register'}</button>
      </form>
    </div>
  );
}

export default Register;
