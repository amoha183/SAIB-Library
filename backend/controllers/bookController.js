import {
    getAllBooksFromDB,
    getBookByIdFromDB,
    createBookInDB,
    updateBookInDB,
    deleteBookFromDB
} from '../models/bookModel.js';

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await getAllBooksFromDB();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Get single book by ID
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await getBookByIdFromDB(id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Error fetching book' });
    }
};

// Create new book
export const createBook = async (req, res) => {
    try {
        const { title, author, isbn, quantity } = req.body;
        
        // Validate input
        if (!title || !author || !isbn || quantity === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const bookId = await createBookInDB({ title, author, isbn, quantity });
        
        res.status(201).json({
            message: 'Book created successfully',
            bookId
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Error creating book' });
    }
};

// Update book
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, quantity } = req.body;
        
        // Validate input
        if (!title || !author || !isbn || quantity === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const updated = await updateBookInDB(id, { title, author, isbn, quantity });
        
        if (!updated) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Error updating book' });
    }
};

// Delete book
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await deleteBookFromDB(id);
        
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Error deleting book' });
    }
};

