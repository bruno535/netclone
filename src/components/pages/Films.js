import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import NavBar from '../NavBar.js';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../MovieList.css';

function Films() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const apiKey = process.env.REACT_APP_API_KEY;
      const urlGenres = `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${apiKey}`;
      const urlMoviesByGenre = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=${apiKey}`;

      try {
        const [responseGenres, responseMoviesByGenre] = await Promise.all([
          fetch(urlGenres),
          fetch(urlMoviesByGenre)
        ]);

        const dataGenres = await responseGenres.json();
        const dataMoviesByGenre = await responseMoviesByGenre.json();

        const { genres } = dataGenres;

        const filmsData = genres.map(genre => ({
          genreId: genre.id,
          genreName: genre.name,
          films: dataMoviesByGenre.results.filter(movie =>
            movie.genre_ids.includes(genre.id)
          )
        }));

        setFilms(filmsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const renderMovieList = (genreId) => {
    const genreFilms = films.find((genre) => genre.genreId === genreId)?.films || [];
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
          className="movie-poster"
        />
      </div>
    ));
    const emptyDivs = Array(emptyDivsCount).fill(<div className="empty-movie" />);
    return movieElements.concat(emptyDivs);
  };

  const renderGenres = () => {
    return (
      <div className="genres">
        {films.map((genre) => (
          <div key={genre.genreId}>
            <h2>{genre.genreName}</h2>
            <AliceCarousel
              disableDotsControls
              items={renderMovieList(genre.genreId)}
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
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <NavBar />
          <div className="movie-list filmsSeries">
            {renderGenres()}
          </div>
        </>
      )}
    </>
  );
}

export default Films;
