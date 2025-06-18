// 📁 src/pages/Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setMessage, setIsLoggedIn, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
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
        setShowLogin(true);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {showLogin ? 'Log In' : 'Create Account'}
        </h1>

        <form
          onSubmit={showLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {!showLogin && (
            <div>
              <label className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {showLogin ? 'Log In' : 'Register'}
          </button>
        </form>

        {showLogin && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <button
              onClick={() => setShowLogin(false)}
              className="text-blue-600 hover:underline"
            >
              Register instead
            </button>
          </p>
        )}

        {!showLogin && (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button
              onClick={() => setShowLogin(true)}
              className="text-blue-600 hover:underline"
            >
              Log in instead
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
