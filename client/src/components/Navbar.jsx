import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  const user = useSelector((state)=>state.auth.user)
  console.log(`user logged in ${user}`)

  const buttons = `m-2 px-4 py-2 rounded-md hover:border-solid hover:border-2 hover:border-black bg-black text-white hover:bg-white hover:text-black`

  return (
    <div className='w-[100%] my-6 py-4 flex flex-row justify-between items-center border-b-2'>
        <div className='mx-2 text-2xl'><Link to="/">Quotes</Link></div>
          {
            !isAuthenticated ?
            (
              <div className=''>
                <Link to="/login" className={`${buttons}`}>Login</Link>
                <Link to="/signup "className={`${buttons}`}>Signup</Link>
              </div>
              ):
            (
              <div className={`${buttons} rounded-full`}>{user}</div>
            )

          }
    </div>
  )
}

export default Navbar