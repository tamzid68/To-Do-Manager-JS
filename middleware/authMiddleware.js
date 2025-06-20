//File: middleware/authMiddleware.js
// This middleware checks for a valid JWT token in the request headers.
const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authHeader = req.headers['authorization'];
        if(!authHeader || !authHeader.startsWith('Bearer ')) 
            return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET,
            {algorithms: ['HS256']}, // Specify the algorithm used for signing the token
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Failed to authenticate token" });
                }
                req.user = decoded; // Attach the decoded user info to the request object
                next(); // Call the next middleware or route handler
            });
    }
    catch (error) {
       // console.error("Error in token verification:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

module.exports = tokenVerify;