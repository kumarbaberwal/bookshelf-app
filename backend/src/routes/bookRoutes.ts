import express from 'express';
import { veryfyToken } from '../middlewares/authMiddleware';
import { bookController, deleteBook, getAllBooks } from '../controllers/bookControllers';

const router = express.Router();

router.post('/', veryfyToken, bookController);
router.get('/', veryfyToken, getAllBooks);
router.delete('/:id', veryfyToken, deleteBook);

export default router;