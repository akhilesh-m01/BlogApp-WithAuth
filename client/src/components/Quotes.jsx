import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
  const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
  console.log("BACKEND_URL:", BACKEND_URL);

  const fetchQuotes = useCallback(async () => {
    try {
      console.log("environment:",process.env.NODE_ENV)
      console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
      console.log("BACKEND_URL:", BACKEND_URL);

      const res = await fetch(`${BACKEND_URL}/user/quotes`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch quotes');
      }

      const data = await res.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError(error.message);
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [BACKEND_URL, navigate, isAuthenticated]);

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