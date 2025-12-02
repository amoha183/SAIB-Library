// API Base URL
const API_URL = 'http://localhost:3000/api';

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (!token || role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }
    
    loadBooks();
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

// Load all books
async function loadBooks() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/books`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Failed to load books');
    }
}

// Display books in the container
function displayBooks(books) {
    const container = document.getElementById('booksContainer');
    
    if (books.length === 0) {
        container.innerHTML = '<p>No books available. Add your first book!</p>';
        return;
    }
    
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Quantity:</strong> ${book.quantity}</p>
            <div class="book-actions">
                <button class="btn-primary" onclick="openEditModal(${book.id}, '${book.title}', '${book.author}', '${book.isbn}', ${book.quantity})">Edit</button>
                <button class="btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add new book
document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value,
        quantity: parseInt(document.getElementById('quantity').value)
    };
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData)
        });
        
        if (response.ok) {
            alert('Book added successfully!');
            document.getElementById('addBookForm').reset();
            loadBooks();
        } else {
            alert('Failed to add book');
        }
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Failed to add book');
    }
});

// Open edit modal
function openEditModal(id, title, author, isbn, quantity) {
    document.getElementById('editBookId').value = id;
    document.getElementById('editTitle').value = title;
    document.getElementById('editAuthor').value = author;
    document.getElementById('editIsbn').value = isbn;
    document.getElementById('editQuantity').value = quantity;
    document.getElementById('editModal').style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
});

// Update book
document.getElementById('editBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editBookId').value;
    const bookData = {
        title: document.getElementById('editTitle').value,
        author: document.getElementById('editAuthor').value,
        isbn: document.getElementById('editIsbn').value,
        quantity: parseInt(document.getElementById('editQuantity').value)
    };
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData)
        });
        
        if (response.ok) {
            alert('Book updated successfully!');
            document.getElementById('editModal').style.display = 'none';
            loadBooks();
        } else {
            alert('Failed to update book');
        }
    } catch (error) {
        console.error('Error updating book:', error);
        alert('Failed to update book');
    }
});

// Delete book
async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            alert('Book deleted successfully!');
            loadBooks();
        } else {
            alert('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book');
    }
}

