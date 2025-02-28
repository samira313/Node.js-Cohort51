import newDatabase from './database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = true;
const database = newDatabase({isPersistent})

// Secret key for JWT
const SECRET_KEY = 'eBg8xnpkNZI23HBvrdZwlMAyfOB6xHzA';

// Middleware to register a new user
export const register = async (req , res) => {

    const { username, password } = req.body;
    console.log("Recieved register request:", req.body);

    if (!username || !password) {
        res.status(400).send("Username and password are required");
        return;
    }

    // Fetch all users from the database
    const allUsers = database.getAll();
    const existingUser = allUsers.find((user) => user.username === username);
    if (existingUser) {
        res.status(409).send("User already exists");
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12); // Hash the password
        const storedUser = database.create({ username, password: hashedPassword }); 
        res.status(201).send({
            id: storedUser.id,
            username: storedUser.username
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}
// Middleware to hanle user login 
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request:", req.body);

    if (!username || !password) {
        res.status(400).send("Username and password are required");
        return;
    }
    const allUsers = database.getAll();
    const user = allUsers.find((user) => user.username === username);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    try {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({message: 'Login succssful', token });
        }
        else {
            res.status(401).send("Invalid password");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// Middleware to retrieve user profile
export const getProfile = (req, res) => {                                                        
    const authHeader = req.headers.authorization; // Get authorization header

    if (!authHeader) {
        res.status(401).send("Authorization header is invalid");
        return;
    }
    const token = authHeader.split(" ")[1]; // Extract token from Bearer token
                                                                          
    try {
        const decoded = jwt.verify(token, SECRET_KEY);                 
        const userId = decoded.id;                                     
        const user = database.getById(userId); // Retrieve user from the database by ID
                                                                         
        if (!user) {                  
            res.status(404).send("User not found");
            return;
        }
        res.status(200).send({  message: `Profile retrieved successfully! ${user.username}`,
            username: user.username });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Ivalid or expired token");
    }
}

// Middleware to handle logout user
export const logout = (req, res) => {
    res.status(200).send("Logout successful");
}

// You can also create helper functions in this file to help you implement logic
// inside middlewares
