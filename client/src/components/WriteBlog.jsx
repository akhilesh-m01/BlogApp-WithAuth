import React, { useState } from 'react'
import axios from 'axios'

const WriteBlog = () => {

    const [blog,setBlog] = useState({
        title:"",
        desc:"",
        image:""
    })

    const handleChange = (e) =>{
      setBlog({
        ...blog,
        [e.target.name] : e.target.value
      })
    }

    const handleFileChange = (e) => {
      setBlog({
        ...blog,
        image: e.target.files[0], // Set the file directly
      });
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('desc', blog.desc);
      if (blog.image) {
        formData.append('image', blog.image);
      }

      // const BACKEND_URL = "https://blog-app-server1.vercel.app" || "http://localhost:3000";
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.post(`${BACKEND_URL}/user/myblog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        withCredentials: true 
      });
      
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' name="title" value={blog.title} onChange={handleChange}/>
            <input type='text' placeholder='Description' name="desc" value={blog.desc} onChange={handleChange}/>
            <input type='file' name="image" onChange={handleFileChange}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default WriteBlog