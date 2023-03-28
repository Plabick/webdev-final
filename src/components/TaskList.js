import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask } from '../redux/actions';

function TaskList({ setEditingTask }) {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const handleToggle = id => {
        dispatch(toggleTask(id));
    };

    const handleEdit = task => {
        setEditingTask(task);
    };

    const renderTaskCard = (task) => (
        <div key={task.id} className="card mb-3" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="card-body">
                <div className="d-flex">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={task.done}
                        onChange={() => handleToggle(task.id)}
                    />
                    <span
                        className={task.done ? 'done' : ''}
                        onClick={() => handleEdit(task)}
                    >
            {task.text}
          </span>
                </div>
            </div>
        </div>
    );

    const completedTasks = tasks.filter(task => task.done);
    const uncompletedTasks = tasks.filter(task => !task.done);

    return (
        <div className="d-flex flex-column align-items-center">

            <h2 className="mb-4">To Do</h2>
            {uncompletedTasks.map(renderTaskCard)}

            <h2 className="mb-4 mt-5">Completed</h2>
            {completedTasks.map(renderTaskCard)}
        </div>
    );
}

export default TaskList;
