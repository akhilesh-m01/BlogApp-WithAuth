import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetMyBlogs = () => {
    const [myBlogs,setMyBlogs] = useState([]);

    useEffect(() => {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        console.log("BACKEND_URL:", BACKEND_URL); 
        
        async function fetchBlogs() {
          try {
            const result = await axios.get(`${BACKEND_URL}/user/getmyblogs`, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              },
            });
            console.log("result:", result);
            setMyBlogs(result.data);
          } catch (error) {
            console.error("Error fetching blogs:", error);
          }
        }
        fetchBlogs();
      }, []);

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
                        <p>{b.desc.split(" ").slice(0,5).join(" ")}...</p>
                        <p>{b.user_id}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default GetMyBlogs
