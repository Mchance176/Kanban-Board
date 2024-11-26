import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // Extract token from Authorization header (Bearer TOKEN format)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // Return 401 if no token is present
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Attach user data to request for use in subsequent middleware/routes
        req.user = decoded;
        next();
    }
    catch (err) {
        // Return 403 if token is invalid or expired
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
