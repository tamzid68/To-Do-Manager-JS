// File: routes/todoRoutes.js
const express = require('express');
const router = express.Router();

const tokenVerify = require('../middleware/authMiddleware');
const { getTodos, addTodo, deleteTodo, updatedTodo } = require('../controllers/todoController');

router.get('/test', tokenVerify, (req, res) => {
    res.status(200).json({ message: "You have accessed the sent todos" });
});
router.get('/get', tokenVerify, getTodos);
router.post('/set', tokenVerify, addTodo);
router.delete('/:id', tokenVerify, deleteTodo);
router.put('/:id', tokenVerify, updatedTodo);

module.exports = router;