import express from 'express';
import { veryfyToken } from '../middlewares/authMiddleware';
import { bookController } from '../controllers/bookControllers';

const router = express.Router();

router.post('/', veryfyToken, bookController);

export default router;