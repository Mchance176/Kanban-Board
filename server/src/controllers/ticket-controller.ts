import { Request, Response } from 'express';
import { Ticket } from '../models/index.js';
import { User } from '../models/user.js';

// GET /tickets
export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /tickets/:id
export const getTicketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /tickets
export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, status, description, assignedUserId } = req.body;
    const newTicket = await Ticket.create({ title, status, description, assignedUserId });
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT /tickets/:id
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { title, status, description, assignedUserId } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    
    if (ticket) {
      ticket.title = title;
      ticket.status = status;
      ticket.description = description;
      ticket.assignedUserId = assignedUserId;
      
      await ticket.save();
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE /tickets/:id
export const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      await ticket.destroy();
      res.json({ message: 'Ticket deleted' });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
