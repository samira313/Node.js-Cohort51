import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { register, login, getProfile, logout } from './users.js';

// Define the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
let app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the routes (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


// Define the API routes for the user authentication
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/profile', getProfile);
app.post('/auth/logout', logout);

// Serve the front-end application from the `client` folder
app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});