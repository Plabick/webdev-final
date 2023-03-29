import React, { useContext } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import UserContext from '../UserContext';
import MovieSearch from "./MovieSearch";

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="d-flex flex-column align-items-center">
            {user && <TaskForm />}
            <TaskList />
            <MovieSearch/>
        </div>
    );
};

export default HomePage;
