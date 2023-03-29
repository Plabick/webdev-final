import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import renderTaskCard from "./TaskCard";
import UserContext from '../UserContext';

const UserProfile = () => {
    const { username } = useParams();
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const { user: loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5002/tasks/user/${username}`);
            setTasks(response.data);

            const { data: user } = await axios.get(`http://localhost:5002/users/username/${username}`);
            setUser(user);
        };
        fetchData();
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const isCurrentUserProfile = loggedInUser && loggedInUser.username === user.username;

    return (
        <div>
            <h4 className="text-muted">{username} is a {user.role}</h4>
            {isCurrentUserProfile && (
                <>
                    <p>Phone Number: {user.phone_number}</p>
                    <p>Email: {user.email}</p>
                </>
            )}
            <h2>{username}'s Tasks</h2>
            <ul>
                {tasks.map((task) => (renderTaskCard(task)
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
