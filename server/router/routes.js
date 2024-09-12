const express = require('express');
const myRouter = express.Router();
const { signup, signIn, quotes } = require('../controller/authController');
const { myquotes } = require('../controller/myquotes');
const {myblog,getMyBlogs} = require('../controller/blogData.controller')
const { myLogger } = require('../middleware/auth');
const upload = require('../middleware/multer')


myRouter.post('/signup', signup);
myRouter.post('/signin', signIn);
myRouter.get('/quotes', myLogger, quotes);
myRouter.post('/myquotes', myLogger, myquotes);
myRouter.post("/myblog",myLogger, upload.single('image'),myblog);
myRouter.get("/getmyblogs",myLogger,getMyBlogs);

module.exports = myRouter;
