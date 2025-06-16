const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tamzid@#_ASM@%$##123';
const { readData, writeData } = require('../utils/fileHandler');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const userFile = path.join(__dirname, '../data/users.json');


const signup = async (req, res) => {
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
};


module.exports = { signup };