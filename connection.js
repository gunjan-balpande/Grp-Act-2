const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const db = mysql.createPool({
    host: 'your-rds-endpoint', // Replace with your RDS endpoint
    user: 'your-username',     // Replace with your RDS username
    password: 'your-password', // Replace with your RDS password
    database: 'your-database'  // Replace with your database name
});

// Middleware
app.use(bodyParser.json());

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Query to get user data
    db.query('SELECT hashed_password FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare hashed password
        const hashedPassword = results[0].hashed_password;
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }
            if (result) {
                res.status(200).json({ message: 'Login successful!' });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(Server running on http://localhost:${port});
});
