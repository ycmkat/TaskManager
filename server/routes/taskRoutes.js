const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /api/tasks: Retrieve all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
