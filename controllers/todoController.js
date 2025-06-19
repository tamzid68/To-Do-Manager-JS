//File: controllers/todoController.js
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/fileHandler');
//const { all } = require('../routes/todoRoutes');

const todoFilePath = path.join(__dirname, '../data/todos.json');

const getTodos = async (req, res) => {
    try {
        const todos = await readData(todoFilePath);// Read existing todos from the file

        // Check if the user is authenticated
        const userTodos = todos.filter(todo => todo.userId == req.user.id);
        res.status(200).json(userTodos);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};



const addTodo = async (req, res) => {
    try {
        const todos = await readData(todoFilePath);
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

        //const todos = await readData(todoFilePath);
        todos.push(newTodo);// Add the new todo to the todos array
        await writeData(todoFilePath, todos);

        res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};


const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id.trim();// Get the to-do ID from the request parameters
        const userId = req.user.id;

        const todos = await readData(todoFilePath);

        // Find the index of the to-do to delete
        const todoIndex = todos.findIndex(todo => todo.id === todoId);

        // Check if the to-do exists
        if (todoIndex === -1)
            return res.status(404).json({ message: 'To-do not found.' });

        // Verify the to-do belongs to the user trying to delete it
        if (todos[todoIndex].userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own to-dos.' });
        }

        // Remove the to-do item from the array
        todos.splice(todoIndex, 1);

        // Write the updated array back to the file
        await writeData(todoFilePath, todos);

        res.status(200).json({ message: 'To-do deleted successfully.' });
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updatedTodo = async (req, res) => {
    try {
        const allTodos = await readData(todoFilePath);

        const todoIdUpdate = req.params.id.trim();
        const userId = req.user.id;
        const { text, completed } = req.body || {};

        if (text === undefined && completed === undefined)
            return res.status(400).json({ message: 'No update data provided. Please provide text or completed status.' });

        // Find the index of the to-do to update
        const todoIndex = allTodos.findIndex(todo => todo.id === todoIdUpdate);

        // Check if the to-do exists
        if (todoIndex === -1)
            return res.status(404).json({ message: 'To-do not found.' });

        // Verify the to-do belongs to the user trying to update it
        if (allTodos[todoIndex].userId !== userId)
            return res.status(403).json({ message: 'Forbidden: You can only update your own to-dos.' });

        // Update the properties if new values are provided
        if (text !== undefined)
            allTodos[todoIndex].text = text;

        if (completed !== undefined)
            allTodos[todoIndex].completed = completed;

        // Write the updated array back to the file
        await writeData(todoFilePath, allTodos);

        res.status(200).json({ message: 'To-do updated successfully.', todo: allTodos[todoIndex] });
    }
    catch (error) {
        //console.error("Error updating todo:", error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updatedTodo
};