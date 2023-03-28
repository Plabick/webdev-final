const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    user: { type: String, required: true }, // Add the user field
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
