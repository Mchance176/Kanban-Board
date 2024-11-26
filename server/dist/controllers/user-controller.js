import { User } from '../models/index.js';
// GET /users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username'] // Exclude password
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET /users/:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'username'] // Exclude password
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST /users
export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.status(201).json({
            id: user.id,
            username: user.username
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// PUT /users/:id
export const updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.username = username;
            if (password) {
                user.password = password;
            }
            await user.save();
            res.json({
                id: user.id,
                username: user.username
            });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// DELETE /users/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
