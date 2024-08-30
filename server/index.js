const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/dbConnect");
const router = require("./router/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

dbConnect();

app.use(cors({
    origin: ['http://localhost:5173','https://blog-app-client1.vercel.app'], // Adjust this based on your needs
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/user", router);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get("/hello",(req,res)=>{
    res.json({
        message:"Deployed successfully"
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

module.exports = app;
