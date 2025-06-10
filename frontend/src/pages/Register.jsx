// 📁 src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ users, setUsers, setMessage, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users[email]) {
      setMessage('User already exists. Please log in.');
      navigate('/');
      return;
    }

    const updatedUsers = { ...users, [email]: password };
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setIsLoggedIn(true);
    setMessage('Account created! Redirecting to dashboard...');
    navigate('/dashboard');
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label>Password:</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
