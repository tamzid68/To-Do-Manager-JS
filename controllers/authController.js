const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tamzid@#_ASM@%$##123';



const signup = async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    console.log("User signed up with username:", username, password);
};


module.exports = { signup };