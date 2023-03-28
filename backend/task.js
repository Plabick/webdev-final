const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: { type: String, required: true },
    done: { type: Boolean, required: true },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
