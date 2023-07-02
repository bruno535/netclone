import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMovie = data.results[randomIndex];
                setMovie(randomMovie);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const backgroundStyles = {
        backgroundImage: movie
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : '',
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="banner" style={backgroundStyles}>
            {movie && (
                <div className="banner-content">
                    <h1>{movie.title}</h1>
                    <p>{`${movie.overview.slice(0, 200)}${movie.overview.length > 200 ? '...' : ''
                        }`}</p>
                    <button
                        className="buttonPlay"
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        Play
                    </button>
                    <button className="buttonMyList">Minha Lista</button>
                </div>
            )}
        </div>
    );
};

export default Banner;
