import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import UserContext from '../UserContext';

function TaskForm() {
    const { user: loggedInUser } = useContext(UserContext);

    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    if (!loggedInUser || loggedInUser.role !== 'maker') {
        return (<h6>Only Makers Can Make Tasks</h6>);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text.trim()) {
            await dispatch(addTask({ text, user: user.username })); // Pass the task object here
            setText('');
        }
    };

    //TODO fix style
    return (
        <form onSubmit={handleSubmit} className="input-group mb-3 task-card">
            <input
                type="text"
                className="form-control"
                placeholder="Enter a task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                    Add Task
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
