const router = require('express').Router();
const Task = require('./task');



router.route('/').get(async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/add').post((req, res) => {
    const text = req.body.text;
    const user = req.body.user; // Add this line
    const done = false;
    const newTask = new Task({ text, done, user });

    newTask
        .save()
        .then(() => res.json('Task added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json('Task deleted.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.post('/update/:id', async (req, res) => {
    const taskId = req.params.id;
    const { text, done } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { text, done }, { new: true });
        if (!updatedTask) {
            res.status(400).json({ message: 'Task not found' });
        } else {
            res.json(updatedTask);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error updating task', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            res.status(400).json({ message: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted', taskId });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error deleting task', error: err });
    }
});
module.exports = router;

router.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const tasks = await Task.find({ user: username });
        console.log(tasks)
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks by user' });
    }
});
