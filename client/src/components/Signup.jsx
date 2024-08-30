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

    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
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
    <div>
        <form onSubmit={submitHandler}>
            <label>Username</label>
            <input type='text' name='username' placeholder='enter username' onChange={changeHandler}/>
            <label>email</label>
            <input type='text' name='email' placeholder='enter email' onChange={changeHandler}/>
            <label>password</label>
            <input type='password' name='password' placeholder='enter password' onChange={changeHandler}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Signup