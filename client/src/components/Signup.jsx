import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    });

    const changeHandler = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // const BACKEND_URL = "https://blog-app-server1.vercel.app" || "http://localhost:3000";
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const submitHandler = async (e) =>{
        e.preventDefault();
        console.log(user)
        try{
            const res = await axios.post(`${BACKEND_URL}/user/signup`,user);
            console.log(res);
        }
        catch(e){
            console.log(e);
        }

    }
    

  return (
    // <div>
    //     <form onSubmit={submitHandler}>
    //         <label>Username</label>
    //         <input type='text' name='username' placeholder='enter username' onChange={changeHandler}/>
    //         <label>email</label>
    //         <input type='text' name='email' placeholder='enter email' onChange={changeHandler}/>
    //         <label>password</label>
    //         <input type='password' name='password' placeholder='enter password' onChange={changeHandler}/>
    //         <button type='submit'>Submit</button>
    //     </form>
    // </div>

    // added styles
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={changeHandler}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={changeHandler}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={changeHandler}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>
  )
}

export default Signup