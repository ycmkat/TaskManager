const mongoose = require('mongoose');

// create schema for Task
const taskSchema = new mongoose.Schema({
    /*
    Note: We will be using the default _id field from mongoose.
    Alternatively, we could define our own id field as follows:
    id: {  
        type: String,
        required: true,
        unique: true  // primary key
    },
    */
    title: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Task', taskSchema)