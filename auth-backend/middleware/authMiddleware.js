const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        }
        req.user = decoded; // Attach decoded user data to request object
        next();
    });
};

module.exports = authenticateToken;
