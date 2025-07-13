import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Not authenticated. Please login.');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:8080/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to fetch books. Please login again.');
      navigate('/login');
    }
  };

  const deleteBook = async (isbn) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Not authenticated. Please login.');
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/books/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <LogoutButton />
      <button onClick={() => navigate('/books/add')}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            {book.title} by {book.author} ({book.publicationyear})
            <button onClick={() => navigate(`/books/edit/${book.isbn}`)}>Edit</button>
            <button onClick={() => deleteBook(book.isbn)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
