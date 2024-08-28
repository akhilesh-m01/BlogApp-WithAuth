const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
    quoteTitle:{
        type:String,
        required:true,
        trim:true,
    },
    quoteDesc:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' //referring to User 
    }
})

const Quote = mongoose.model('Quote',quoteSchema);

module.exports = Quote;