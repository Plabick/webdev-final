const router = require('express').Router();
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
    const { username, password, role, phone_number, email } = req.body;
    const newUser = new User({ username, password, role, phone_number, email });

    try {
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.log(req.body.role)
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

// Add this new route at the bottom of your routes/users.js file
router.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;
