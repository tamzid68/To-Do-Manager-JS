const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { readData, writeData } = require('../utils/fileHandler');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const userFile = path.join(__dirname, '../data/users.json');


const signup = async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const users = await readData(userFile);

        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id: uuidv4(),// Generate a unique ID for the user
            username,
            password: hashedPassword,
        };

        users.push(newUser);
        await writeData(userFile, users);
        res.status(201).json({ message: "User signed up successfully" });
        console.log("User signed up with username:", username, password);
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password)
            return res.status(400).json({ message: "Username and password are required" });

        const users = await readData(userFile);

        //1. Check if the user exists
        const user = users.find(user => user.username === username);
        if (!user)
            return res.status(400).json({ message: "user not found" });

        //2. Check if the password matches
        // bcrypt.compare() is an asynchronous function that compares the provided password with the hashed password stored in the database
        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ message: "Invalid username or password" });


        //3. If the user exists and the password matches, generate a JWT token
        // The payload can contain any information you want to include in the token
        const payload = {
            id: user.id,
            username: user.username
        };


        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }


};


module.exports = { signup, login };