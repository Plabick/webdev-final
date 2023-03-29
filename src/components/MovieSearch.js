// MovieSearch.js
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from "../UserContext";

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
console.log(task)
        try {
            await axios.post('http://localhost:5002/tasks/add', task);
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Error adding task. Please try again.');
        }
    };

    return (
        <div>
            <h2>Movie Search</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    required
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title">{movie.Title} ({movie.Year})</h3>
                                <button className="btn btn-primary" onClick={() => handleAdd(movie)}>Add</button>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default MovieSearch;
