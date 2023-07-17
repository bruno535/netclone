import React, { useState, useEffect } from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';

const MovieList = () => {
    const navigate = useNavigate();
    const [popularFilms, setPopularFilms] = useState([]);
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    const [upcomingFilms, setUpcomingFilms] = useState([]);
    const [nowPlayingFilms, setNowPlayingFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const urls = [
                `https://api.themoviedb.org/3/discover/movie?language=pt-BR&sort_by=popularity.desc&api_key=${apiKey}`,
                `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&api_key=${apiKey}`,
                `https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&api_key=${apiKey}`,
                `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&api_key=${apiKey}`,
            ];

            try {
                const responses = await Promise.all(urls.map((url) => fetch(url)));
                const data = await Promise.all(
                    responses.map((response) => response.json())
                );

                const popularFilmsData = await fetchMultiplePages(
                    data[0].total_pages,
                    apiKey,
                    'popular'
                );
                const topRatedFilmsData = await fetchMultiplePages(
                    data[1].total_pages,
                    apiKey,
                    'top_rated'
                );
                const upcomingFilmsData = await fetchMultiplePages(
                    data[2].total_pages,
                    apiKey,
                    'upcoming'
                );
                const nowPlayingFilmsData = await fetchMultiplePages(
                    data[3].total_pages,
                    apiKey,
                    'now_playing'
                );

                setPopularFilms(popularFilmsData);
                setTopRatedFilms(topRatedFilmsData);
                setUpcomingFilms(upcomingFilmsData);
                setNowPlayingFilms(nowPlayingFilmsData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const fetchMultiplePages = async (totalPages, apiKey, category) => {
        let filmsData = [];
        const maxPages = Math.min(totalPages, 10);

        for (let i = 1; i <= maxPages; i++) {
            const url = `https://api.themoviedb.org/3/movie/${category}?language=pt-BR&api_key=${apiKey}&page=${i}`;
            const response = await fetch(url);
            const data = await response.json();
            filmsData = filmsData.concat(data.results);
        }

        return filmsData;
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const renderMovieList = (films) => (
        <AliceCarousel
            infinite
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
                <GrLinkPrevious className="buttonPrev" disabled={isDisabled} />
            )}
            renderNextButton={({ isDisabled }) => (
                <GrLinkNext className="buttonNext" disabled={isDisabled} />
            )}
        />
    );

    return (
        <>
            {isLoading ? (
                <div>
                    <AiOutlineLoading3Quarters className="loading" />
                </div>
            ) : (
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
            )}
        </>
    );
};

export default MovieList;
