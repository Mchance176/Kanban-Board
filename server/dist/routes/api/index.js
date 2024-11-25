import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../../middleware/auth.js';
const router = Router();
// Protected routes - require authentication
router.use('/tickets', authenticateToken, ticketRouter);
router.use('/users', authenticateToken, userRouter);
export default router;
