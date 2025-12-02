// API Base URL - Update this to match your backend server
const API_URL = 'http://localhost:3000/api';

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user info in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('userName', data.name);
            
            // Redirect based on role
            if (data.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'customer.html';
            }
        } else {
            errorMessage.textContent = data.message || 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'Unable to connect to server. Please try again later.';
    }
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
        // Redirect to appropriate page if already logged in
        if (role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'customer.html';
        }
    }
});

