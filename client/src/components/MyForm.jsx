import axios from 'axios'
import React, { useState } from 'react'

const MyForm = () => {

    const [quote,setQuote] = useState({
        title:"",
        desc:""
    })
    // const BACKEND_URL = "https://blog-app-server1.vercel.app" || "http://localhost:3000";
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const handleChange = (e) =>{
        setQuote({
            ...quote,
            [e.target.name]: e.target.value
        });
    }
    const token = sessionStorage.getItem("token");
    const headers = {
        Authorization: token
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // post in the backend
        const res = await axios.post(`${BACKEND_URL}/user/myquotes`,quote,{
            withCredentials:true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res)
    }
  return (
    <div>
        <h1>Enter Quote</h1>
        <form onSubmit={handleSubmit}>
            <label>Enter title</label>
            <input type='text' name="title" placeholder='enter title' onChange={handleChange}/>
            <label>Enter Desc:</label>
            <input type='text' name="desc" placeholder='enter desc' onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default MyForm