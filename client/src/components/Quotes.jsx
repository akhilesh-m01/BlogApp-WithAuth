import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Login from './Login';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);


  useEffect(() => {
    // const token = sessionStorage.getItem("token");
    // const token = ?
    const BACKEND_URL = process.env.BACKEND_URL | "http://localhost:3000" ;

    fetch(`${BACKEND_URL}/user/quotes`, {
      method: 'GET',
      credentials: 'include', // Include cookies with the request
      headers: {
        // 'Authorization': `${yourToken}`, // Replace with actual token if needed
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch quotes');
        }
      })
      .then(data => {
        setQuotes(data)
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
        navigate('/login');
      });
  }, []);

  return (
    <>
    {
      isAuthenticated ? (
        <div>
          <h1>Quotes</h1>
          <ul>
            {quotes.map((q, index) => (
              <li key={index}>{q.quote}</li>
            ))}
          </ul>
        </div>
      ):(
        <Login/>
      )
    }
    </>
    
  );
};

export default Quotes;