const mongoose = require("mongoose");


const dbConnect = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to db");
    }
    catch(e){
        console.log("failed to connect to database",e)
    }

    

}


module.exports = dbConnect;


