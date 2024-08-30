const jwt = require('jsonwebtoken');

const myLogger = async (req, res, next) => {
    try {
        const token = await req.cookies?.token; // Get the token from cookies
        console.log('token:',token)

        if (!token) {
            return res.status(401).json({ message: 'Token is required',token1:token });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            // Attach decoded user info to the request object
            req.user = decoded;
            next();
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { myLogger };
