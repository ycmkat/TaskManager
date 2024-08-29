const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /api/tasks: Retrieve all tasks
router.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// POST /api/tasks: Create a new task
router.post('/api/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message});  // Bad request
    }
})

module.exports = router;
