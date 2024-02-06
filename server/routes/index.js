import { Router } from "express";
import ticketRoutes from './ticket.routes.js'
import userRoutes from './user.routes.js'
import busRoutes from './bus.routes.js'

const router = Router();

router.use('/ticket', ticketRoutes)
router.use('/user', userRoutes)
router.use('/bus', busRoutes)


export default router;