import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, ] = useState(false);
  const navigate = useNavigate();

  const signupUser = (e) => {
    e.preventDefault();
    const signupData = {
      username: username,
      password: password,
    };
    axios.post('http://localhost:8080/auth/register', signupData)
      .then(response => {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        alert('Signup failed! Please try again.');
      });
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={signupUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button" disabled={loading}>
  {loading ? 'Signing up...' : 'Signup'}
</button>
      </form>
    </div>
  );
}
export default SignUp

