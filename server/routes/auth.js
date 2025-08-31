import express from 'express';
import {
    register,
    checkSomething,
    login,
    logOut
} from "../controllers/authController.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut);
router.get('/check-auth', checkSomething);

export default router;