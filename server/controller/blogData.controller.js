const path = require('path')
const Blog = require('../db/BlogSchema')
const cloudinary = require('../utils/cloudinary')
const jwt = require('jsonwebtoken');

const myblog = async (req,res) =>{
    try{
        const {title,desc} = req.body;

        const token = req.cookies.token;
        const decoded = await jwt.verify(token,process.env.JWT_KEY);
        const user_id = decoded._id;

        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
            tags: [title, desc]
          });

        const blog = await Blog.create({
            title,
            desc,
            imageurl: result.secure_url,
            userid:user_id
        })
        

        res.status(201).json({
            message: "Blog created successfully",
            blog: blog
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = myblog;