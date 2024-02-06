import { Router } from "express";
import { getCurrentUser, login, register, sellerLogin, sellerRegister } from "../controllers/user.controllers.js";
import { extractToken } from "../middlewares/TokenMiddleware.js";

const router = Router();

router.post('/login', login)
router.post('/register', register)
router.post('/seller-login', sellerLogin)
router.post('/seller-register', sellerRegister)
router.post('/get-current-user',extractToken, getCurrentUser)

export default router;