// API Base URL
const API_URL = 'http://localhost:3000/api';

let allBooks = [];

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
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
        
        allBooks = await response.json();
        displayBooks(allBooks);
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Failed to load books');
    }
}

// Display books in the container
function displayBooks(books) {
    const container = document.getElementById('booksContainer');
    
    if (books.length === 0) {
        container.innerHTML = '<p>No books available at the moment.</p>';
        return;
    }
    
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Available:</strong> ${book.quantity > 0 ? 'Yes' : 'Out of Stock'}</p>
            <p><strong>Copies:</strong> ${book.quantity}</p>
        </div>
    `).join('');
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', searchBooks);
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchBooks();
    }
});

function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        displayBooks(allBooks);
        return;
    }
    
    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    
    displayBooks(filteredBooks);
}

