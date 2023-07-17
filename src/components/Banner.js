import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${apiKey}`;
                const response = await fetch(url);
                const data = await response.json();

                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMovie = data.results[randomIndex];

                setMovie(randomMovie);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovie();
    }, []);

    const formatReleaseDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div
            className="banner"
            style={{
                backgroundImage: movie
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : '',
            }}
        >
            {movie && (
                <div className="bannerContent">
                    <div>
                        <h1>{movie.title}</h1>
                        <h2>{formatReleaseDate(movie.release_date)}</h2>
                    </div>
                    <div className="buttons">
                        <button
                            className="button1"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            Play
                        </button>
                        <Link className="button2" to="/my-list">
                            Minha Lista
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;
