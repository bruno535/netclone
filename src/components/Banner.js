import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, []);

    const formatReleaseDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="banner" style={{ backgroundImage: movie ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : '' }}>
            {movie && (
                <div className="bannerContent">
                    <div>
                        <h1>{movie.title}</h1>
                        <h2>{formatReleaseDate(movie.release_date)}</h2>
                    </div>
                    <p>{`${movie.overview.slice(0, 200)}${movie.overview.length > 200 ? '...' : ''}`}</p>
                    <button className="button1" onClick={() => handleMovieClick(movie.id)}>
                        Play
                    </button>
                    <Link className="button2" to="/my-list">
                        Minha Lista
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Banner;
