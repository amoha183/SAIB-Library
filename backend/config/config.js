import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
    // Server configuration
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Database configuration
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'library_db',
        port: process.env.DB_PORT || 3306
    },
    
    // JWT configuration
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },
    
    // CORS configuration
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    }
};

export default config;

