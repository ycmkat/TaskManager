const mongoose = require('mongoose');

// create schema for Task
const Task = new mongoose.Schema({
    // id and title
    /*
    id: {  // alternatively, use default _id field from mongoose
        type: String,
        required: true,
        unique: true  // primary key
    },
    */
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', Task)