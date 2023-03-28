const router = require('express').Router();
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    try {
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).json({ message: 'Error registering user', error: err });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid username or password' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error logging in', error: err });
    }
});

module.exports = router;
