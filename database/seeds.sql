-- Use the library database
USE library_db;

-- Insert demo users
-- Password for admin@library.com: admin123
-- Password for customer@library.com: customer123
-- Passwords are hashed using bcrypt (10 rounds)

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@library.com', '$2a$10$8K1p/a0dL3.I9/YS4XqYqO5JlUKfGKz5sflN5eY5K5K5K5K5K5K5K', 'admin'),
('John Customer', 'customer@library.com', '$2a$10$8K1p/a0dL3.I9/YS4XqYqO5JlUKfGKz5sflN5eY5K5K5K5K5K5K5K', 'customer');

-- Note: The above hashed passwords are examples. 
-- For actual use, run the backend server and use the /api/auth/register endpoint
-- Or generate proper bcrypt hashes for your passwords

-- Alternative: Insert users with plain text passwords (ONLY FOR DEVELOPMENT)
-- You'll need to hash these manually or use the register endpoint
-- DELETE FROM users;
-- Then use the register API endpoint to create users with properly hashed passwords

-- Insert demo books
INSERT INTO books (title, author, isbn, quantity) VALUES
('To Kill a Mockingbird', 'Harper Lee', '978-0-06-112008-4', 5),
('1984', 'George Orwell', '978-0-452-28423-4', 3),
('The Great Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 7),
('Pride and Prejudice', 'Jane Austen', '978-0-14-143951-8', 4),
('The Catcher in the Rye', 'J.D. Salinger', '978-0-316-76948-0', 6),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '978-0-590-35340-3', 10),
('The Hobbit', 'J.R.R. Tolkien', '978-0-547-92822-7', 8),
('Fahrenheit 451', 'Ray Bradbury', '978-1-451-67331-9', 5),
('The Lord of the Rings', 'J.R.R. Tolkien', '978-0-544-00341-5', 4),
('Animal Farm', 'George Orwell', '978-0-452-28424-1', 6);

-- Display success message
SELECT 'Demo data inserted successfully!' AS message;
SELECT 'Total users:', COUNT(*) FROM users;
SELECT 'Total books:', COUNT(*) FROM books;

