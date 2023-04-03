import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, editTask, fetchTasks, toggleTask} from '../redux/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserContext from "../UserContext";

    function TaskList() {
        const tasks = useSelector((state) => state.tasks);
        const dispatch = useDispatch();
        const {user: loggedInUser} = useContext(UserContext);
        const isChecker = loggedInUser && loggedInUser.role === 'checker';

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

        const renderTaskCard = (task) => {
            const cardStyle = task.done ? 'list-group-item-success' : 'list-group-item-warning';

            return( <div key={task._id} className={`card mb-3 ${cardStyle}`} style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-body task-card">
                    <div className="d-flex align-items-center">
                        {isChecker &&(<input
                            type="checkbox"
                            className="mr-2"
                            checked={task.done}
                            onChange={() => handleToggle(task._id)}
                        />)}
                        <span
                            className={task.done ? 'done' : ''}
                            onClick={() => handleEdit(task)}
                        >
            {task.text}
          </span>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className=" text-danger p-10 xicon"
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
        );}
        const userTasks = loggedInUser ? tasks.filter(task => task.user === loggedInUser.username || task.done_by === loggedInUser.username) : [];
        const otherTasks = loggedInUser ? tasks.filter(task => task.user !== loggedInUser.username && task.done_by !== loggedInUser.username) : tasks;

        return (
            <div className="d-flex flex-column align-items-center">
                {loggedInUser && !isChecker && (
                    <>
                        <h3>Your Tasks</h3>
                        {userTasks.map((task) => renderTaskCard(task))}
                    </>
                )}
                <h3>All Tasks</h3>
                {otherTasks.map((task) => renderTaskCard(task))}
            </div>
        );
    }

    export default TaskList;
