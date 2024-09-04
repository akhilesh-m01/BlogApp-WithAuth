const jwt = require('jsonwebtoken');

const myLogger = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies);
        const token = req.cookies.token; // Assuming 'token' is the name of your cookie
        
        if (!token) {
            console.log("No token found in cookies");
            return res.status(403).json({ message: "No token provided" });
        }
        

        // Verify the token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log("Token verification failed:", err);
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            console.log("Token verified successfully");
            req.userId = decoded.id;
            next();
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { myLogger };
