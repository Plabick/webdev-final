// MovieSearch.js
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from "../UserContext";
import { Link } from 'react-router-dom';


const MovieSearch = ({ onAdd }) => {
    const { search } = useParams();
    const [query, setQuery] = useState(search || '');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const {user: loggedInUser} = useContext(UserContext);

    useEffect(() => {
        if (search) {
            fetchMovies(search);
        }
    }, [search]);

    const fetchMovies = async (searchQuery) => {
        const { data } = await axios.get(
            `http://www.omdbapi.com/?apikey=550215da&s=${searchQuery}`
        );

        if (data.Response === 'True') {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`);
    };

    const handleAdd = async (movie) => {
        const task = {
            text: movie.Title,
            user: loggedInUser.username // Replace this with the actual user if needed
        };
        try {
            await axios.post('http://localhost:5002/tasks/add', task);
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Error adding task. Please try again.');
        }
        navigate('/');
    };

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <h2>Movie Search</h2>
            <form onSubmit={handleSubmit} className="input-group mb-3 task-card">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    required
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                        Search
                    </button>
                </div>
            </form>
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title">{movie.Title} ({movie.Year})</h3>
                                <button className="btn btn-primary" onClick={() => handleAdd(movie)}>Add</button>
                                <Link to={`/details/${movie.imdbID}`} className="btn btn-info ml-2">Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
