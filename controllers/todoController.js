const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/fileHandler');

const todoFilePath = path.join(__dirname, '../data/todos.json');

const getTodos = async (req, res) => {
    try {
        const todos = await readData(todoFilePath);

        const userTodos = todos.filter(todo => todo.userId == req.user.id);
        res.status(200).json(userTodos);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

const addTodo = async (req, res) => {
    try {
        const { text } = req.body || {};
        if (!text)
            return res.status(400).json({ message: "Text is required" });

        const newTodo = {
            id: uuidv4(),
            userId: req.user.id, // Get user ID from the authenticated user (added by middleware)
            text: text,
            completed: false, // Default to false
            createdAt: new Date().toISOString()
        };

        const todos = await readData(todoFilePath);
        todos.push(newTodo);
        await writeData(todoFilePath, todos);

        res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};


module.exports={
    getTodos,
    addTodo
};