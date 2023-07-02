import React, { useState, useEffect } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import NavBar from './NavBar.js';
import Banner from './Banner.js';
import Footer from './Footer.js';

import './MovieList.css';

const MovieList = () => {
    const navigate = useNavigate();
    const [popularFilms, setPopularFilms] = useState([]);
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [nowPlayingFilms, setNowPlayingFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const urlPopular = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&sort_by=popularity.desc&api_key=${apiKey}`;
            const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&api_key=${apiKey}`;
            const urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&api_key=${apiKey}`;
            const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&api_key=${apiKey}`;

            try {
                const responsePopular = await fetch(urlPopular);
                const dataPopular = await responsePopular.json();
                setPopularFilms(dataPopular.results);

                const responseTopRated = await fetch(urlTopRated);
                const dataTopRated = await responseTopRated.json();
                setTopRatedFilms(dataTopRated.results);

                const responseUpcoming = await fetch(urlUpcoming);
                const dataUpcoming = await responseUpcoming.json();
                setUpcomingFilms(dataUpcoming.results);

                const responseNowPlaying = await fetch(urlNowPlaying);
                const dataNowPlaying = await responseNowPlaying.json();
                setNowPlayingFilms(dataNowPlaying.results);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const renderMovieList = (films) => (
        <AliceCarousel
            disableDotsControls
            items={films.map((movie) => (
                <div
                    key={movie.id}
                    className="movie"
                    onClick={() => handleMovieClick(movie.id)}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>
            ))}
            responsive={{
                0: { items: 2 },
                510: { items: 3 },
                768: { items: 5 },
                1024: { items: 7 },
            }}
            renderPrevButton={({ isDisabled }) => (
                <GrLinkPrevious
                    className="alice-carousel__prev-btn"
                    disabled={isDisabled}
                />
            )}
            renderNextButton={({ isDisabled }) => (
                <GrLinkNext
                    className="alice-carousel__next-btn"
                    disabled={isDisabled}
                />
            )}
        />
    );

    return (
        <>
            <NavBar />
            <Banner />
            <div className="movie-list">
                <h2>Filmes Populares</h2>
                {renderMovieList(popularFilms)}

                <h2>Filmes Bem Avaliados</h2>
                {renderMovieList(topRatedFilms)}

                <h2>Filmes em Breve</h2>
                {renderMovieList(upcomingFilms)}

                <h2>Lançamentos</h2>
                {renderMovieList(nowPlayingFilms)}
            </div>
            <Footer />
        </>
    );
};

export default MovieList;
