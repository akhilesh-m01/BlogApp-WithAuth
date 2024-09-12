import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetMyBlogs = () => {
    const [myBlogs,setMyBlogs] = useState([]);

    useEffect(()=>{
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
        async function  fetchBlogs(){
            const result = await axios.get(`${BACKEND_URL}/user/getmyblogs`,{
                withCredentials:true,
                header:{
                    'Content-Type':'application/json'
                }
            })
            console.log("result:",result);
            const data = result.data;
            console.log("data",data)
            setMyBlogs(data);
        }
        fetchBlogs();

    },[])

  return (
    <div className='flex flex-col justify-center items-center'>
        {
            myBlogs.map((b)=>(
                <div key={b._id} className='flex m-4 shadow-md p-4 w-[50%] ease-in-out duration-500 hover:scale-105 hover:z-10 rounded-md'>
                    <img 
                    src={b.imageurl} 
                    className='aspect-[16/9] overflow-hidden rounded-xl object-cover w-48 h-48' 
                    alt='NA'/>
                    <div>
                        <h1>{b.title}</h1>
                        <p>{b.desc}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default GetMyBlogs
