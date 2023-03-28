const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tasksRouter = require('./routes');


const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);


mongoose.connect('mongodb://localhost:27017/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
