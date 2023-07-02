import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieTrailer from './MovieTrailer.js';
import './MovieDetail.css';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR&api_key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovie(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovie();
    }, [movieId]);

    const handlePlayClick = () => {
        setShowVideo(true);
    };

    const handleBackClick = () => {
        setShowVideo(false);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details">
            {!showVideo ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            ) : (
                <MovieTrailer movie={movie} />
            )}

            {!showVideo ? (
                <div>
                    <h2>{movie.title}</h2>
                    <div>
                        <button className="buttonPlay" onClick={handlePlayClick}>
                            Play
                        </button>
                        <Link className="buttonMyList" to="/">
                            Sair
                        </Link>
                    </div>
                </div>
            ) : (
                <button className="buttonPlay voltar" onClick={handleBackClick}>
                    Voltar
                </button>
            )}
        </div>
    );
};

export default MovieDetails;
