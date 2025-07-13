import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    alert("Logged out sucessfully");
    navigate('/login');
  };

  return (
    <button onClick={logout} style={{ marginBottom: '20px' }}>Logout</button>
  );
}

export default LogoutButton;
