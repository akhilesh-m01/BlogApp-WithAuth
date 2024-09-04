// import axios from 'axios'
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {useSelector,useDispatch} from 'react-redux'
// import {login,logout} from '../store/authSlice'

// const Login = () => {

//     const navigate = useNavigate();

//     // subscribe to specific piece
//     const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

//     // dispatch state and payload 
//     const dispatch = useDispatch();

//     const [luser,setlUser] = useState({
//         email:"",
//         password:""
//     })

//     const changeHandler = (e) =>{
//         setlUser({
//             ...luser,
//             [e.target.name]: e.target.value
//         })

//     }

    
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             // const BACKEND_URL = "https://blog-app-server1.vercel.app" || "http://localhost:3000";
//             const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//             console.log("BACKEND_URL:", BACKEND_URL);

//             const res = await axios.post(`${BACKEND_URL}/user/signin`, luser,{
//                 withCredentials:true,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             },);
            
//             // Assuming the username is part of the response data
//             const username = luser.email.split('@')[0];
//             dispatch(login({ username }));
            

//             // Redirect to quotes page
//             navigate("/quotes");
//         } catch (error) {
//             console.error("Login failed:", error);
//             // Optionally handle error, e.g., show message to user
//         }
//     };

//   return (
    // <div>
    //     <h1>Login</h1>
    //     <form onSubmit={submitHandler}>
    //         <label>email</label>
    //         <input type="text" name='email' onChange={changeHandler}/>
    //         <label>password</label>
    //         <input type='password' name='password' onChange={changeHandler}/>
    //         <button type='submit'>Submit</button>
    //     </form>
    //     {/* {
    //         isAuthenticated ?
    //         (
    //             <div>
    //                 <p>Logged in successfully</p>
    //                 <Link to="/quotes">Quotes</Link>
    //             </div>
    //         ):
    //         (
    //             <Link to="/login">Login</Link>
    //         )
    //     } */}
    // </div>

//     <div className="flex h-screen items-center justify-center bg-background px-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-1 border-b px-6 py-4">
//           <CardTitle className="text-2xl font-bold">Login</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 px-6 py-8">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="m@example.com" required />
//           </div>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="password">Password</Label>
//               <Link href="#" className="text-sm underline" prefetch={false}>
//                 Forgot password?
//               </Link>
//             </div>
//             <Input id="password" type="password" required />
//           </div>
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </CardContent>
//         <CardFooter className="border-t px-6 py-4">
//           <p className="text-center text-sm text-muted-foreground">
//             Don&apos;t have an account?{" "}
//             <Link href="#" className="font-medium underline" prefetch={false}>
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [luser, setlUser] = useState({
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    setlUser({
      ...luser,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      const res = await axios.post(`${BACKEND_URL}/user/signin`, luser, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const username = luser.email.split('@')[0]
      dispatch(login({ username }))
      navigate("/quotes")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={submitHandler} className="space-y-4 px-6 py-8">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="m@example.com"
              onChange={changeHandler}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={changeHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="border-t px-6 py-4">
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login