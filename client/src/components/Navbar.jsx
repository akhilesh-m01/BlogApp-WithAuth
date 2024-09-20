import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'

const Navbar = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  const user = useSelector((state)=>state.auth.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);



  const loggingout = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    console.log(BACKEND_URL);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (res.status === 200) {
        dispatch(logout());
        navigate("/");
      } else {
        console.error('Logout failed:', res.data);
        // Handle unexpected response
      }
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const displayLogout = () => {
    return (
      <div className="absolute top-full left-0 mt-1 w-full">
        <button
          className="w-full px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100 border border-gray-200 rounded-md shadow-md"
          onClick={loggingout}
        >
          Logout
        </button>
      </div>
    )
  }
   

  const buttons = `m-2 px-4 py-2 rounded-md hover:border-solid hover:border-2 hover:border-black bg-black text-white hover:bg-white hover:text-black`

  return (
    <div className='w-[100%] py-4 flex flex-row justify-between items-center border-b-2'>
        <div className='mx-2 text-2xl'><Link to="/">Blogs</Link></div>
          {
            (isAuthenticated) ?
            (
              <div className='flex'>
                <div className='relative'>
                  <button className={`${buttons} rounded-full`} onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}>{user}</button>
                  {showLogoutConfirm && displayLogout()}
                </div>
                <Link className={`${buttons} rounded-full`} to="/write">Write Blog</Link>
              </div>
            ):
            (
              <div className=''>
                <Link to="/login" className={`${buttons}`}>Login</Link>
                <Link to="/signup "className={`${buttons}`}>Signup</Link>
              </div>
              )
          }
    </div>
  )
}

export default Navbar