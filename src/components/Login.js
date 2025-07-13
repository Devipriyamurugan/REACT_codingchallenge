import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault(); //to prevent refresh
    const loginData = { username, password }; 

    axios.post('http://localhost:8080/auth/login', loginData)
      .then(response => {

        const token = response.data.token;
        console.log (token)
        localStorage.setItem('token', token);
        alert('Login successful!');
        navigate('/books');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        alert('Login failed! Please check your credentials.');
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to ="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login

