import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

const Quotes = () => {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const fetchQuotes = async () => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      console.log("Fetching quotes from:", BACKEND_URL)
      try {
        const response = await axios.get(`${BACKEND_URL}/user/quotes`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log("Quotes response:", response.data)
        setQuotes(response.data)
      } catch (error) {
        console.error("Error fetching quotes:", error.response?.data || error.message)
      }
    }

    fetchQuotes()
  }, [])

  return (
    <div>
      <h1>Quotes</h1>
      {quotes.length === 0 ? (
        <p>No quotes available.</p>
      ) : (
        <ul>
          {quotes.map((q, index) => (
            <li className='p-4 m-2 border shadow-md rounded-md hover:border-black hover:border-1' key={index}>{q.quote}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Quotes;
