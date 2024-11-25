import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';

const router = express.Router();

// GET /users - Get all users (admin only)
router.get('/', getAllUsers);

// GET /users/:id - Get user by id (authenticated user or admin)
router.get('/:id', getUserById);

// POST /users - Create new user (public route for registration)
router.post('/', createUser);

// PUT /users/:id - Update user (authenticated user or admin)
router.put('/:id', updateUser);

// DELETE /users/:id - Delete user (admin only)
router.delete('/:id', deleteUser);

// GET /users/me - Get current user's profile
router.get('/me', (req: any, res) => {
  // The user object is attached by the authenticateToken middleware
  res.json({ user: req.user });
});

export { router as userRouter };
