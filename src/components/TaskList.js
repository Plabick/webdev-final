import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteTask, fetchTasks, toggleTask} from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TaskList({ setEditingTask }) {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleEdit = task => {
        setEditingTask(task);
    };

    const handleToggle = id => {
        dispatch(toggleTask(id));
    };
    const handleDelete = id => {
        dispatch(deleteTask(id));
    };



    const renderTaskCard = (task) => (
        <div key={task._id} className="card mb-3" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={task.done}
                        onChange={() => handleToggle(task._id)}
                    />
                    <span
                        className={task.done ? 'done' : ''}
                        onClick={() => handleEdit(task)}
                    >
            {task.text}
          </span>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="ml-auto text-danger"
                        onClick={() => handleDelete(task._id)}
                        style={{ cursor: 'pointer' }}
                    />
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
