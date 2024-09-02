
const User = require("../db/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// signup
const signup = async (req,res) =>{
    const {username,email,password} = req.body;
    console.log(req.body);
    
    try{
        const dbUser = await User.findOne({email:email});
        if(dbUser){
            console.log("User already exists");
        }
        
        // hash the password
        const salt = await bcrypt.genSalt();
        const hashPassword  = await bcrypt.hash(password,salt);

        const user = await User.create({
            username,
            email,
            password:hashPassword
        })

        console.log("user created successfully",user);
        res.status(201).json({ message: "User created successfully", user });
    }
    catch(e){
        console.log("error signing up",e);
    }
}

// signin
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const dbUser = await User.findOne({ email });
        if (!dbUser) {
            console.log("User does not exist");
            return res.status(400).send({ message: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const passwordCompare = await bcrypt.compare(password, dbUser.password);
        if (!passwordCompare) {
            return res.status(400).send({ message: "Password is incorrect" });
        }

        // Generate a token using JWT
        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' });

        // Set the token in an HTTP-only cookie
        res
        .status(200)
        .cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'Lax',
            path: '/',
        })
        .json({
            token: token,
            message: "User logged in",
            user: dbUser,
        });

        console.log("cookie set successfully - ",token)

    } catch (e) {
        console.log("Error signing in", e);
        res.status(500).send({ message: `Error signing in: ${e}` });
    }
};



// logout
const logout = async () =>{
    try{
        

    }
    catch(e){
        console.log("error logging out",e);
    }
}

const quotes = async (req,res) =>{
    try{
        const response = await fetch('https://dummyjson.com/quotes');
        const data = await response.json();
        console.log(data);
        res.send(data.quotes);
    }
    catch(e){
        console.log(e)
    }
}

module.exports = {signup,signIn,quotes}