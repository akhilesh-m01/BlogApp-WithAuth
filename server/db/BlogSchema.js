const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    desc:{
        type: String,
        required: true,
        trim: true
    },
    imageurl:{
        type: String,
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Blog = mongoose.model('Blog',BlogSchema)

module.exports = Blog;