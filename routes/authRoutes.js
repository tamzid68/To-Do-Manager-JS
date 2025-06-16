const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');

router.post('/signup', (req, res) => {
    signup(req, res);
    res.send("User signed up successfully");
});

router.get('/login', (req, res) => {
    res.send("User Login page");
});


module.exports = router;