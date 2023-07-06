import React, { useState, useEffect } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import NavBar from './NavBar.js';
import Banner from './Banner.js';
import Footer from './Footer.js';

const MovieList = () => {
    const navigate = useNavigate();
    const [popularFilms, setPopularFilms] = useState([]);
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [nowPlayingFilms, setNowPlayingFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const urls = [
                `https://api.themoviedb.org/3/discover/movie?language=pt-BR&sort_by=popularity.desc&api_key=${apiKey}`,
                `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&api_key=${apiKey}`,
                `https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&api_key=${apiKey}`,
                `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&api_key=${apiKey}`
            ];

            try {
                const responses = await Promise.all(urls.map(url => fetch(url)));
                const data = await Promise.all(responses.map(response => response.json()));
                setPopularFilms(data[0].results);
                setTopRatedFilms(data[1].results);
                setUpcomingFilms(data[2].results);
                setNowPlayingFilms(data[3].results);
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
                768: { items: 4 },
                850: { items: 5 },
                1024: { items: 7 },
            }}
            renderPrevButton={({ isDisabled }) => (
                <GrLinkPrevious
                    className="buttonPrev"
                    disabled={isDisabled}
                />
            )}
            renderNextButton={({ isDisabled }) => (
                <GrLinkNext
                    className="buttonNext"
                    disabled={isDisabled}
                />
            )}
        />
    );

    return (
        <>
            <NavBar />
            <Banner />
            <div className="movieList">
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