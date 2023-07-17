import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import AliceCarousel from 'react-alice-carousel';
import NavBar from '../NavBar.js';
import 'react-alice-carousel/lib/alice-carousel.css';

const Films = ({ isSerie }) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const genreType = isSerie ? 'tv' : 'movie';
        const urlGenres = `https://api.themoviedb.org/3/genre/${genreType}/list?language=pt-BR&api_key=${apiKey}`;

        const responseGenres = await fetch(urlGenres);
        const { genres } = await responseGenres.json();

        const filmsData = await Promise.all(
          Array.from({ length: 10 }, (_, i) => {
            const urlMoviesByGenre = `https://api.themoviedb.org/3/discover/${genreType}?language=pt-BR&api_key=${apiKey}&page=${i + 1
              }`;
            return fetch(urlMoviesByGenre)
              .then((responseMoviesByGenre) => responseMoviesByGenre.json())
              .then(({ results: filmsByGenre }) => ({
                genreId: genres[i].id,
                genreName: genres[i].name,
                films: filmsByGenre,
              }));
          })
        );

        setFilms(filmsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isSerie]);

  const navigate = useNavigate();
  const handleMovieClick = (movieId) => {
    const path = isSerie ? `/serie/${movieId}` : `/movie/${movieId}`;
    navigate(path);
  };

  const renderMovieList = (genreId) => {
    const genreFilms =
      films.find((genre) => genre.genreId === genreId)?.films || [];
    const emptyDivsCount = Math.max(7 - genreFilms.length, 0);
    const movieElements = genreFilms.map((movie) => (
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
    ));
    const emptyDivs = Array(emptyDivsCount).fill(
      <div key={genreId} className="empty-movie" />
    );
    return [...movieElements, ...emptyDivs];
  };

  const renderGenres = () => {
    return (
      <div>
        {films.map((genre) => (
          <div key={genre.genreId} className="movieList">
            <h2>{genre.genreName}</h2>
            <AliceCarousel
              disableDotsControls
              items={renderMovieList(genre.genreId)}
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
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="movieContainer">
      {isLoading ? (
        <div>
          <AiOutlineLoading3Quarters className="loading" />
        </div>
      ) : (
        <>
          <NavBar />
          <div>{renderGenres()}</div>
        </>
      )}
    </div>
  );
};

export default Films;
