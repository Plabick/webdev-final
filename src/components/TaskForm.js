import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/actions';

function TaskForm({ editingTask, setEditingTask }) {
    const dispatch = useDispatch();
    const [task, setTask] = useState(editingTask ? editingTask.text : '');

    const handleSubmit = e => {
        e.preventDefault();
        if (!task.trim()) return;

        if (editingTask) {
            dispatch(editTask({ ...editingTask, text: task }));
            setEditingTask(null);
        } else {
            const newTask = {
                id: Date.now(),
                text: task,
                done: false,
            };
            dispatch(addTask(newTask));
        }

        setTask('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form mb-3">
            <div className="form-group d-flex">
                <input
                    type="text"
                    className="form-control mr-2 flex-grow-1"
                    placeholder="Enter a task"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    {editingTask ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
