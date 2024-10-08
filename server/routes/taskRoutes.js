const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /api/tasks: Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET /api/tasks/:id: Get a single task by id
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/tasks: Create a new task
router.post('/', async (req, res) => {
    // check if title is present
    if (!req.body.title) {
        return res.status(400).json({ message: "Title is required"});
    }
    const task = new Task({
        title: req.body.title,
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message}); 
    }
});

// PATCH /api/tasks/:id: Update an existing task
router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({message: 'Task not found'});
        if (req.body.title != null) {
            task.title = req.body.title;
        }
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// DELETE /api/tasks/:id: Delete an existing task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id});
        if (!task) return res.status(404).json({message: 'Task not found'});
        res.status(200).json({message: 'Task deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
