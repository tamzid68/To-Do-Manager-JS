const express = require('express');
const router = express.Router();

const tokenVerify = require('../middleware/authMiddleware');

router.get('/sent', tokenVerify, (req, res) => {
    res.status(200).json({ message: "You have accessed the sent todos" });
});

module.exports = router;