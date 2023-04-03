// MovieDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from "../UserContext";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [tasks, setTasks] = useState([]);
    const { user: loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            const { data } = await axios.get(`http://www.omdbapi.com/?apikey=550215da&i=${id}`);
            setMovie(data);
        };

        const fetchTasks = async () => {
            const { data } = await axios.get('http://localhost:5002/tasks/');
            setTasks(data);
        };

        fetchMovie();
        fetchTasks();
    }, [id]);

    const handleAdd = async (movie) => {
        const task = {
            text: movie.Title,
            user: loggedInUser.username
        };
        try {
            await axios.post('http://localhost:5002/tasks/add', task);
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Error adding task. Please try again.');
        }
        navigate('/');
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    const relatedTasks = tasks.filter(task => task.text === movie.Title);

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{movie.Title} ({movie.Year})</h3>
                    <p className="card-text">Director: {movie.Director}</p>
                    <p className="card-text">Actors: {movie.Actors}</p>
                    <p className="card-text">Plot: {movie.Plot}</p>
                    <button className="btn btn-primary" onClick={() => handleAdd(movie)}>Add</button>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-header">
                    Users who already added this movie
                </div>
                <ul className="list-group list-group-flush">
                    {relatedTasks.map(task => (
                        <li key={task._id} className="list-group-item">
                            <Link to={`/user/${task.user}`} className="link-dark text-decoration-none">
                                {task.user}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieDetails;
