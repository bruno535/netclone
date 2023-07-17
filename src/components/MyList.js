import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import NavBar from './NavBar';
import './MyList.css';

const MyList = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMovies = localStorage.getItem('movies');
        if (storedMovies) {
            const parsedMovies = JSON.parse(storedMovies);
            setMovies(parsedMovies);
        }
    }, []);

    const handleRemoveFromList = (movieId) => {
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
        localStorage.setItem('movies', JSON.stringify(updatedMovies, null, 2));
        alert('Filme removido da lista!');
    };

    const handleMovieClick = (movieId, isSerie) => {
        navigate(isSerie ? `/serie/${movieId}` : `/movie/${movieId}`);
    };

    if (movies.length === 0) {
        return (
            <>
                <NavBar />
                <div className="myListContainer">
                    <h2>Minha Lista de Filmes</h2>
                    <div className="emptyDiv">Sua lista está vazia.</div>
                </div>
            </>
        );
    }

    // Preparar o array de filmes para ter 7 elementos, caso necessário
    while (movies.length < 7) {
        movies.push({ empty: true });
    }

    return (
        <div className="myListContainer">
            <NavBar />
            <h2>Minha Lista de Filmes</h2>

            <AliceCarousel
                disableButtonsControls
                disableDotsControls
                responsive={{
                    0: { items: 2 },
                    510: { items: 3 },
                    768: { items: 4 },
                    850: { items: 5 },
                    1024: { items: 7 },
                }}
            >
                {movies.map((movie, index) => {
                    const isSerie = !!movie.name;
                    return (
                        <div key={index} className="movie">
                            {movie.poster_path && (
                                <>
                                    <img
                                        onClick={() => handleMovieClick(movie.id, isSerie)}
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <button
                                        className="button1"
                                        onClick={() => handleRemoveFromList(movie.id)}
                                    >
                                        Remover
                                    </button>
                                </>
                            )}
                        </div>
                    );
                })}
            </AliceCarousel>
        </div>
    );
};

export default MyList;
