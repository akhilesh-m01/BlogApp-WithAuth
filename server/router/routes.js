const express = require('express');
const myRouter = express.Router();
const { signup, signIn, quotes } = require('../controller/authController');
const { myquotes } = require('../controller/myquotes');
const { myLogger } = require('../middleware/auth');

myRouter.post('/signup', signup);
myRouter.post('/signin', signIn);
myRouter.get('/quotes', myLogger, quotes);
myRouter.post('/myquotes', myLogger, myquotes);

module.exports = myRouter;
