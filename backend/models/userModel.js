import db from './db.js';

// Find user by email
export const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Find user by ID
export const findUserById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Create new user
export const createUser = async (userData) => {
    try {
        const { name, email, password, role } = userData;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role || 'customer']
        );
        return result.insertId;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Get all users (admin only)
export const getAllUsers = async () => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users');
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

