import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import UserContext from '../UserContext';

const HomePage = () => {
    const { user: loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center">
            {loggedInUser && <TaskForm />}
            { (loggedInUser && loggedInUser.role === 'maker') && (<button className="btn btn-primary" onClick={() => navigate('/search')}>Import Movies</button>)}
           <hr/>
            <TaskList />
        </div>
    );
};

export default HomePage;
