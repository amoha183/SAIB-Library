import express from 'express';
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/books - Get all books (authenticated users)
router.get('/', authenticateToken, getAllBooks);

// GET /api/books/:id - Get single book (authenticated users)
router.get('/:id', authenticateToken, getBookById);

// POST /api/books - Create new book (admin only)
router.post('/', authenticateToken, isAdmin, createBook);

// PUT /api/books/:id - Update book (admin only)
router.put('/:id', authenticateToken, isAdmin, updateBook);

// DELETE /api/books/:id - Delete book (admin only)
router.delete('/:id', authenticateToken, isAdmin, deleteBook);

export default router;

