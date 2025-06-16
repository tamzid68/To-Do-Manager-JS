const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');

router.post('/signup', signup);

router.get('/login', (req, res) => {
    res.send("User Login page");
});


module.exports = router;