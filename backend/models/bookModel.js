import db from './db.js';

// Get all books
export const getAllBooksFromDB = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM books ORDER BY id DESC');
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Get book by ID
export const getBookByIdFromDB = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Create new book
export const createBookInDB = async (bookData) => {
    try {
        const { title, author, isbn, quantity } = bookData;
        const [result] = await db.query(
            'INSERT INTO books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)',
            [title, author, isbn, quantity]
        );
        return result.insertId;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Update book
export const updateBookInDB = async (id, bookData) => {
    try {
        const { title, author, isbn, quantity } = bookData;
        const [result] = await db.query(
            'UPDATE books SET title = ?, author = ?, isbn = ?, quantity = ? WHERE id = ?',
            [title, author, isbn, quantity, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Delete book
export const deleteBookFromDB = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

