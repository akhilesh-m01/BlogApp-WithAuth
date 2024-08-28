const Quotes = require('../db/QuoteSchema');
const jwt = require("jsonwebtoken");
const User = require('../db/UserModel');
const mongoose = require('mongoose')

const myquotes = async (req,res) =>{
    try{
        // const token = req.headers.authorization;

        // http only
        const token = req.cookies.token;
        
        const {title,desc} = req.body;
        const decoded = await jwt.verify(token,process.env.JWT_KEY);
        console.log(`decoded:${decoded}`)
        // const user_id = mongoose.Types.ObjectId(decoded._id);
        console.log(decoded._id)
        const user = await User.findOne({_id:decoded._id});
        console.log(user)
        const newQuote = await Quotes.create({
            quoteTitle:title,
            quoteDesc:desc,
            userId:decoded._id
        })
        console.log("new quote added");
        res.status(200).json({message:`new quote added`,quote:newQuote,user:user});
    }
    catch(e){
        console.log(e)
    }
    
}

module.exports = {myquotes};