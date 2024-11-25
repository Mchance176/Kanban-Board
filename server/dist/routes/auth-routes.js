import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        return res.json({
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                id: user.id
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error during login' });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
