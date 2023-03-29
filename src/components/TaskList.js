import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, editTask, fetchTasks, toggleTask} from '../redux/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

    function TaskList() {
        const tasks = useSelector((state) => state.tasks);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchTasks());
        }, [dispatch]);

        const handleToggle = (id) => {
            dispatch(toggleTask(id));
        };

        const handleDelete = (id) => {
            dispatch(deleteTask(id));
        };
        const handleEdit = task => {
            dispatch(editTask(task));
        };

        const renderTaskCard = (task) => (
            <div key={task._id} className="card mb-3" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-body task-card">
                    <div className="d-flex align-items-start">
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
                    <div className="text-muted text-right" style={{ fontSize: '0.8rem' }}>
                        <Link to={`/user/${task.user}`} className="task-user link-dark button text-decoration-none">
                            {task.user}
                        </Link>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="d-flex flex-column align-items-center">
                {tasks.map((task) => renderTaskCard(task))}
            </div>
        );
    }

    export default TaskList;
