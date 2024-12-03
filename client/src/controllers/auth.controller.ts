import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import session from 'express-session';

// Declare session types
declare module 'express-session' {
  interface SessionData {
    userId: number;
    username: string;
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await user.checkPassword(password);
    console.log('Password validation result:', isValid);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};