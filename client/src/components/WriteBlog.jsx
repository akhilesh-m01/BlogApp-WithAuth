import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const WriteBlog = () => {

    const navigate = useNavigate();

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
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        } 
      });
      
      console.log(res);
      navigate("/getmyblogs");
    }

  return (
    <div>
        {/* <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Title' name="title" value={blog.title} onChange={handleChange}/>
            <input type='text' placeholder='Description' name="desc" value={blog.desc} onChange={handleChange}/>
            <input type='file' name="image" onChange={handleFileChange}/>
            <button type='submit'>Submit</button>
        </form> */}

<main className="flex-1 py-10">
        <div className="container max-w-3xl px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Create Blog Post</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block mb-1 text-sm font-medium text-foreground">
                Title
              </label>
              <input id="title"
               className='w-full border-black border-l-2 p-2 rounded-sm focus:outline-none' 
               placeholder="Enter blog post title" name="title" value={blog.title} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="description" className="block mb-1 text-sm font-medium text-foreground">
                Description
              </label>
              <textarea id="description"
               placeholder="Enter blog post description"
                rows={4} name="desc"
                 value={blog.desc}
                  onChange={handleChange} 
                  className='w-full overflow-visible border-black border-l-2 p-2 rounded-sm focus:outline-none'/>
            </div>
            <div>
              <label htmlFor="image" className="block mb-1 text-sm font-medium text-foreground">
                Image
              </label>
              <input id="image" type='file' name="image" onChange={handleFileChange} />
            </div>
            <div className="flex justify-end">
              <button type="submit" className='bg-black text-white p-2 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black'>Publish</button>
            </div>
          </form>
        </div>
      </main>

    </div>
  )
}

export default WriteBlog