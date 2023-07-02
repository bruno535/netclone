import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import NavBar from '../NavBar.js';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../MovieList.css';

const Series = () => {
    const navigate = useNavigate();
    const [popularSeries, setPopularSeries] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [upcomingSeries, setUpcomingSeries] = useState([]);
    const [nowPlayingSeries, setNowPlayingSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            const urlPopular = `https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&api_key=${apiKey}`;
            const urlTopRated = `https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&api_key=${apiKey}`;
            const urlUpcoming = `https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&api_key=${apiKey}`;
            const urlNowPlaying = `https://api.themoviedb.org/3/tv/airing_today?language=pt-BR&api_key=${apiKey}`;

            try {
                const responsePopular = await fetch(urlPopular);
                const dataPopular = await responsePopular.json();
                setPopularSeries(dataPopular.results);

                const responseTopRated = await fetch(urlTopRated);
                const dataTopRated = await responseTopRated.json();
                setTopRatedSeries(dataTopRated.results.slice(0, 10));

                const responseUpcoming = await fetch(urlUpcoming);
                const dataUpcoming = await responseUpcoming.json();
                setUpcomingSeries(dataUpcoming.results.slice(0, 10));

                const responseNowPlaying = await fetch(urlNowPlaying);
                const dataNowPlaying = await responseNowPlaying.json();
                setNowPlayingSeries(dataNowPlaying.results.slice(0, 10));

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSeriesClick = (seriesId) => {
        navigate(`/movie/${seriesId}`);
    };

    const renderSeriesList = (series) => (
        <AliceCarousel
            disableDotsControls
            items={series.map((series) => (
                <div
                    key={series.id}
                    className="movie"
                    onClick={() => handleSeriesClick(series.id)}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                        alt={series.name}
                    />
                </div>
            ))}
            responsive={{
                0: { items: 2 },
                768: { items: 5 },
                1024: { items: 7 },
            }}
            renderPrevButton={({ isDisabled }) => (
                <button
                    className="alice-carousel__prev-btn"
                    disabled={isDisabled}
                    style={{ left: '-40px', color: 'transparent' }}
                >
                    Prev
                </button>
            )}
            renderNextButton={({ isDisabled }) => (
                <button
                    className="alice-carousel__next-btn"
                    disabled={isDisabled}
                    style={{ right: '-15px', color: 'transparent' }}
                >
                    Next
                </button>
            )}
        />
    );

    return (
        <>
            {isLoading ? (
                <div>Carregando...</div>
            ) : (
                <>
                    <NavBar />
                    <div className="movie-list filmsSeries">
                        <h2>Series Populares</h2>
                        {renderSeriesList(popularSeries)}

                        <h2>Series Mais Bem Avaliados</h2>
                        {renderSeriesList(topRatedSeries)}

                        <h2>Series Em Breve</h2>
                        {renderSeriesList(upcomingSeries)}

                        <h2>Lançamentos</h2>
                        {renderSeriesList(nowPlayingSeries)}
                    </div>
                </>
            )}
        </>
    );
};

export default Series;
