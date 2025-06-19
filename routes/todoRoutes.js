const express = require('express');
const router = express.Router();

const tokenVerify = require('../middleware/authMiddleware');
const { getTodos, addTodo } = require('../controllers/todoController');

router.get('/test', tokenVerify, (req, res) => {
    res.status(200).json({ message: "You have accessed the sent todos" });
});
router.get('/get', tokenVerify, getTodos);
router.post('/set', tokenVerify, addTodo);

module.exports = router;