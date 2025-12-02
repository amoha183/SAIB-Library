import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'library_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get promise-based pool
const promisePool = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('💡 Make sure MySQL is running and credentials are correct');
    } else {
        console.log('✅ Database connected successfully');
        connection.release();
    }
});

export default promisePool;

