import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the structure of our JWT payload
interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Extract token from Authorization header (Bearer TOKEN format)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Return 401 if no token is present
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    
    // Attach user data to request for use in subsequent middleware/routes
    (req as any).user = decoded;
    
    next();
  } catch (err) {
    // Return 403 if token is invalid or expired
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
