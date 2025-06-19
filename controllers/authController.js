// File: controllers/authController.js
// This file contains the authentication logic for user signup and login
// It handles user registration, password hashing, and JWT token generation
//const express = require('express');//remove this later
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { readData, writeData } = require('../utils/fileHandler');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const userFile = path.join(__dirname, '../data/users.json');
const todoFile = path.join(__dirname, '../data/todos.json');


const signup = async (req, res) => {
    try {
        const { username, password } = req.body || {};
        const users = await readData(userFile);// Read existing users from the file

        // Check if username and password are provided
        if (!username || !password)
            return res.status(400).json({ message: "Username and password are required" });

        //Check for password length
        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters long" });

        // Check if the username already exists
        if (users.some(user => user.username === username))
            return res.status(400).json({ message: "Username already exists" });

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user object
        const newUser = {
            id: uuidv4(),// Generate a unique ID for the user
            username,
            password: hashedPassword,
        };

        users.push(newUser);// Add the new user to the users array
        await writeData(userFile, users);// Write the updated users array back to the file

        res.status(201).json({ message: "User signed up successfully" });
        //console.log("User signed up with username:", username, password);
    }
    catch (error) {
        //console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body || {};
        const users = await readData(userFile);// Read existing users from the file
        const user = users.find(user => user.username === username);// Find the user by username

        // Use a single error message for both cases checking username and password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        //3. If the user exists and the password matches, generate a JWT token
        // The payload can contain any information you want to include in the token
        const payload = {
            id: user.id,
            username: user.username
        };

        // Sign the token with the secret key and set an expiration time
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        //console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

const logout = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user

        // Read all todos
        const allTodos = await readData(todoFile);

        // Remove all todos belonging to this user
        const remainingTodos = allTodos.filter(todo => todo.userId !== userId);

        await writeData(todoFile, remainingTodos);

        res.clearCookie('token'); // Clear the token cookie if you use cookies
        res.status(200).json({ message: "User logged out and all to-dos deleted successfully" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { signup, login, logout };