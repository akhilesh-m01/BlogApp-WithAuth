import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const fetchQuotes = useCallback(async () => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      console.log("BACKEND_URL:", BACKEND_URL);

      const response = await axios.get(`${BACKEND_URL}/user/quotes`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      setQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError(error.message);
      if (!isAuthenticated) {
        navigate('/login');
      } 
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuotes();
    }
  }, [isAuthenticated, fetchQuotes]);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Quotes</h1>
      {quotes.length === 0 ? (
        <p>No quotes available.</p>
      ) : (
        <ul>
          {quotes.map((q, index) => (
            <li key={index}>{q.quote}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Quotes;
