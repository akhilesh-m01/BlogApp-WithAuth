import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  const user = useSelector((state)=>state.auth.user)
   

  const buttons = `m-2 px-4 py-2 rounded-md hover:border-solid hover:border-2 hover:border-black bg-black text-white hover:bg-white hover:text-black`

  return (
    <div className='w-[100%] py-4 flex flex-row justify-between items-center border-b-2'>
        <div className='mx-2 text-2xl'><Link to="/">Blogs</Link></div>
          {
            (isAuthenticated) ?
            (
              <div className='flex'>
                <div className={`${buttons} rounded-full`}>{user}</div>
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