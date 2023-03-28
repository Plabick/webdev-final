import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5002/users/register', { username, password });
            setUser(data);
            setMessage('Registered and logged in successfully');
        } catch (err) {
            setMessage('Error registering user');
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            {message && <div className="mt-3">{message}</div>}
        </div>
    );
}

export default Register;
