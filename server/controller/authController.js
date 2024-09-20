
const User = require("../db/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {z} = require("zod");

// signup
const signup = async (req,res) =>{

    // zod validation
    const userSchema = z.object({
        username: z.string().min(3).max(100),
        email: z.string().email().min(3).max(100),
        password: z.string().min(3).max(100),
    })

    const validate = userSchema.safeParse(req.body);

    if(!validate.success){
        return res.status(400).json({message:validate.error.errors[0].message});
    }

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

        const userSchema = z.object({
            email: z.string().email().min(3).max(100),
            password: z.string().min(3).max(100)
        })

        const validate = userSchema.safeParse(req.body);

        if(!validate.success){
            return res.status(400).json({message:validate.error.errors[0].message});
        }

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
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge:3600000,
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
const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        });

        res.status(200).json({ message: "Logged out successfully" });
    }
    catch(e) {
        console.log("Error logging out", e);
        res.status(500).json({ message: "Error logging out" });
    }
};

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

module.exports = {signup,signIn,quotes,logout}
