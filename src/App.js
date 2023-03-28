import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './UserContext';

function App() {
    const [user, setUser] = React.useState(null);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Router>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <Link to="/" className=" btn">
                            <h1>Chaotic Todo List</h1>
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
                    <div className="d-flex flex-column align-items-center">
                        {!user && (
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                            </Routes>)}
                        <hr/>
                        <>
                            {user && (<TaskForm/>)}
                            <TaskList/>
                        </>
                    </div>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
