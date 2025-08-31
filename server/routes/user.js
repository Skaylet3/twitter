import express from 'express';
import { 
    getUser,
    changeProfileInfo,
    deleteAccount,
} from "../controllers/usersController.js";
import { dateCounter } from '../middlewares/dateCounter.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth ,dateCounter ,getUser);
router.put('/', checkAuth , changeProfileInfo);
router.delete('/', checkAuth, deleteAccount);

export default router;