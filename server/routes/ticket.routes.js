import { Router } from "express";
import { bookTicket, getOwnTickets, busTicketHistory } from "../controllers/ticket.controllers.js";

const router = Router();

router.post('/book-ticket', bookTicket)
router.post('/get-own-tickets', getOwnTickets)
router.post('/bus-ticket-history', busTicketHistory)

export default router;