import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {login,logout} from '../store/authSlice'

const Login = () => {

    const navigate = useNavigate();

    // subscribe to specific piece
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

    // dispatch state and payload 
    const dispatch = useDispatch();

    const [luser,setlUser] = useState({
        email:"",
        password:""
    })

    const changeHandler = (e) =>{
        setlUser({
            ...luser,
            [e.target.name]: e.target.value
        })

    }

    const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("environment:",process.env.NODE_ENV)
            console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
            const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
            console.log("BACKEND_URL:", BACKEND_URL);

            const res = await axios.post(`${BACKEND_URL}/user/signin`, luser,{
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/json'
                }
            },);
            
            // Assuming the username is part of the response data
            const username = luser.email.split('@')[0];
            dispatch(login({ username }));
            

            // Redirect to quotes page
            navigate("/quotes");
        } catch (error) {
            console.error("Login failed:", error);
            // Optionally handle error, e.g., show message to user
        }
    };

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
            <label>email</label>
            <input type="text" name='email' onChange={changeHandler}/>
            <label>password</label>
            <input type='password' name='password' onChange={changeHandler}/>
            <button type='submit'>Submit</button>
        </form>
        {/* {
            isAuthenticated ?
            (
                <div>
                    <p>Logged in successfully</p>
                    <Link to="/quotes">Quotes</Link>
                </div>
            ):
            (
                <Link to="/login">Login</Link>
            )
        } */}
    </div>
  )
}

export default Login