import React, { useState } from 'react'

const WriteBlog = () => {

    const [blog,setBlog] = useState({
        title:"",
        desc:"",
        image:""
    })

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <input type='text' name="title" value={blog.title} onChange={handleChange}/>
            <input type='text' name="desc" value={blog.desc} onChange={handleChange}/>
        </Form>
    </div>
  )
}

export default WriteBlog