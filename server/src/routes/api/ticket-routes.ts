import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticket-controller.js';

const router = express.Router();

// GET /tickets - Get all tickets for authenticated user
router.get('/', getAllTickets);

// GET /tickets/:id - Get a specific ticket (checks user permission)
router.get('/:id', getTicketById);

// POST /tickets - Create a new ticket for authenticated user
router.post('/', createTicket);

// PUT /tickets/:id - Update a ticket (checks user permission)
router.put('/:id', updateTicket);

// DELETE /tickets/:id - Delete a ticket (checks user permission)
router.delete('/:id', deleteTicket);

export { router as ticketRouter };
