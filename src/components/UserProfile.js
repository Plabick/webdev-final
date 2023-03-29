import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import renderTaskCard from "./TaskCard";
import UserContext from '../UserContext';

const UserProfile = () => {
    const { username } = useParams();
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const { user: loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5002/tasks/user/${username}`);
            setTasks(response.data);

            const { data: user } = await axios.get(`http://localhost:5002/users/username/${username}`);
            setUser(user);
            setEmail(user.email);
            setPhoneNumber(user.phone_number);
        };
        fetchData();
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const isCurrentUserProfile = loggedInUser && loggedInUser.username === user.username;

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5002/users/update/${username}`, { email, phone_number });
            setUser({ ...user, email, phone_number });
        } catch (err) {
            console.error('Error updating user', err);
        }
    };

    return (
        <div>
            <h4 className="text-muted">{username} is a {user.role}</h4>
            {isCurrentUserProfile && (
                <>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </>
            )}
            <h2>{username}'s Tasks</h2>
            <ul>{tasks.map((task) => (renderTaskCard(task)
            ))}
            </ul>
        </div>
    );
};

export default UserProfile;

