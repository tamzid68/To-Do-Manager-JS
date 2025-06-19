const express = require('express');
const router = express.Router();

const tokenVerify = require('../middleware/authMiddleware');
const { getTodos, addTodo, deleteTodo } = require('../controllers/todoController');

router.get('/test', tokenVerify, (req, res) => {
    res.status(200).json({ message: "You have accessed the sent todos" });
});
router.get('/get', tokenVerify, getTodos);
router.post('/set', tokenVerify, addTodo);
router.delete('/delete/:id', tokenVerify, deleteTodo);

module.exports = router;