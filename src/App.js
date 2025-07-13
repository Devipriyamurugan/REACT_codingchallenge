import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import BookEdit from './components/BookEdit';
import BookAdd from './components/BookAdd';
import PrivateRoute from './components/ProtectedRoute';
import SignUp from './components/SignUp';

function App() {
  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        {/*private routes */}
        <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>}/>
        <Route path="/books/add" element={<PrivateRoute><BookAdd /></PrivateRoute>} />
        <Route path="/books/edit/:isbn" element={<PrivateRoute><BookEdit /></PrivateRoute>} />
      </Routes>
    
  );
}

export default App;
