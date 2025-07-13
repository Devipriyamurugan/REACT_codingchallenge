import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookAdd() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const navigate = useNavigate();

  const addBook = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!isbn.trim()) {
      alert('Please enter ISBN');
      return;
    }
    if (!title.trim()) {
      alert('Please enter Title');
      return;
    }
    if (!author.trim()) {
      alert('Please enter Author');
      return;
    }
    if (!publicationYear.trim() || isNaN(parseInt(publicationYear, 10))) {
      alert('Please enter a valid Publication Year');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token || token.split('.').length !== 3) {
      alert('User not authenticated. Invalid or missing token.');
      return;
    }

    const book = {
      isbn,
      title,
      author,
      publicationYear: parseInt(publicationYear, 10),
    };

    axios.post('http://localhost:8080/books', book, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert('Book added successfully');
        navigate('/books');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error('Error adding book data:', error.response.data);
          alert('Failed to add book: ' + JSON.stringify(error.response.data));
        } else {
          console.error('Error adding book:', error.message);
          alert('Failed to add book. Please check your input and try again.');
        }
      });
  };

  return (
    <div className="container">
      <form onSubmit={addBook}>
        <h2>Add a New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Publication Year"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
          min="1850"
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default BookAdd;
