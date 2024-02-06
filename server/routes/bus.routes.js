import { Router } from "express";
import { addBus, readOwnBus,getAllBuses,getbusDetails } from "../controllers/bus.controllers.js";

const router = Router();

router.post('/add-bus', addBus)
router.post('/read-own-buses', readOwnBus)
router.get('/get-all-buses', getAllBuses)
router.post('/get-bus-details', getbusDetails)

export default router;