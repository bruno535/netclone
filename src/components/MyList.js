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
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        alert('Filme removido da lista!');
    };

    if (movies.length === 0) {
        return <div>Sua lista está vazia.</div>;
    }

    const handleMovieClick = (movieId, isSerie) => {
        isSerie ? navigate(`/serie/${movieId}`) : navigate(`/movie/${movieId}`);
    };

    return (
        <div className='myListContainer movieList'>
            <NavBar />
            <h2>Minha Lista de Filmes</h2>

            <AliceCarousel
                disableDotsControls
                responsive={{
                    0: { items: 2 },
                    510: { items: 3 },
                    768: { items: 4 },
                    850: { items: 5 },
                    1024: { items: 7 },
                }}
            >
                {movies.map((movie) => {
                    const isSerie = movie.name ? true : false;
                    return (<div key={movie.id} className='myListMovie' onClick={() => handleMovieClick(movie.id, isSerie)}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <button className='button2' onClick={() => handleRemoveFromList(movie.id)}>
                            Remover
                        </button>
                    </div>
                    )
                })}

            </AliceCarousel>
        </div>
    );
};

export default MyList;
