import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('maker');
    const [message, setMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5002/users/register', {
                username,
                password,
                role,
                phone_number,
                email,
            });
            console.log({
                username,
                password,
                role,
                phone_number,
                email,
            });
            setUser(data);
            setMessage('Registered and logged in successfully');
            navigate('/');
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
                    <div className="form-group">
                        <label>Phone number:</label>
                        <input
                            type="text"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
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
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            id="maker"
                            value="maker"
                            checked={role === 'maker'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="maker">
                            Maker
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            id="checker"
                            value="checker"
                            checked={role === 'checker'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="checker">
                            Checker
                        </label>
                    </div>
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
