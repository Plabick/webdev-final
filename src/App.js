import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import UserContext from './UserContext';
import MovieSearch from "./components/MovieSearch";
import {addTask} from "./redux/actions";

function App() {
    const [user, setUser] = React.useState(null);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <Link to="/" className="app-name-link text-decoration-none">
                            <h1>Chaotic Todo</h1>
                        </Link>
                        <div>
                            {!user && (
                                <>
                                    <Link to="/login" className="btn btn-outline-primary mx-2">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-outline-secondary mx-2">
                                        Register
                                    </Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <span className="logged-in-user me-2">{user.username}</span>
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/user/:username" element={<UserProfile />} />
                        <Route path="/search/:search" element={<MovieSearch onAdd={addTask} />} />

                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
