import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import MovieTrailer from './MovieTrailer';
import './MovieDetail.css';

const MovieDetails = () => {
    const { movieId, serieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.themoviedb.org/3/${!serieId ? `movie/${movieId}` : `tv/${serieId}`
                }?language=pt-BR&api_key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovie();
    }, [movieId, serieId]);

    const handlePlayClick = () => {
        setShowVideo(true);
    };

    const handleBackClick = () => {
        setShowVideo(false);
    };

    const handleAddToListClick = () => {
        const storedMovies = localStorage.getItem('movies');
        const movies = storedMovies ? JSON.parse(storedMovies) : [];

        if (!movies.some((m) => m.id === movie.id)) {
            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));
            alert('Filme adicionado à lista!');
        } else {
            alert('Este filme já está na lista!');
        }
    };

    if (!movie) {
        return (
            <div>
                <AiOutlineLoading3Quarters className="loading" />
            </div>
        );
    }

    return (
        <div className="movieDetails">
            {!showVideo ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            ) : (
                <MovieTrailer movie={movie} />
            )}

            {!showVideo ? (
                <div className="movieDetailsContent">
                    <div>
                        <h2>
                            {`${movie.title || movie.name} (${movie.original_title || movie.original_name
                                })`}
                        </h2>
                        <h4>
                            {`${movie.release_date || movie.first_air_date}${movie.last_air_date ? ` - ${movie.last_air_date}` : ''
                                }`}
                        </h4>
                        {movie.homepage && (
                            <a href={movie.homepage}>Link: Pagina Oficial</a>
                        )}
                        {movie.number_of_episodes && (
                            <span>{`Numero de episódios: ${movie.number_of_episodes}`}</span>
                        )}
                        {movie.number_of_seasons && (
                            <span>{`Numero de temporadas: ${movie.number_of_seasons}`}</span>
                        )}
                        <p>{`Criador(es): ${movie.production_companies
                            .map((c) => c.name)
                            .join(', ')}`}</p>
                        <div>
                            <h4 className="overview">Sinopse</h4>
                            {movie.tagline && <h3>{movie.tagline}</h3>}
                            <p className="overview">{movie.overview}</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="button1" onClick={handlePlayClick}>
                            Play
                        </button>
                        <button className="button2" onClick={handleAddToListClick}>
                            Adicionar à Lista
                        </button>
                        <Link className="button2" to="/">
                            Sair
                        </Link>
                    </div>
                </div>
            ) : (
                <button className="voltar button1" onClick={handleBackClick}>
                    Voltar
                </button>
            )}
        </div>
    );
};

export default MovieDetails;
