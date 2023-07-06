import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import AliceCarousel from 'react-alice-carousel';
import NavBar from '../NavBar.js';
import 'react-alice-carousel/lib/alice-carousel.css';

const Films = ({ isSerie }) => {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const genreType = isSerie ? 'tv' : 'movie';
        const urlGenres = `https://api.themoviedb.org/3/genre/${genreType}/list?language=pt-BR&api_key=${apiKey}`;
        const urlMoviesByGenre = `https://api.themoviedb.org/3/discover/${genreType}?language=pt-BR&api_key=${apiKey}`;

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
    };

    fetchData();
  }, [isSerie]);

  const handleMovieClick = (movieId) => {
    const path = isSerie ? `/serie/${movieId}` : `/movie/${movieId}`;
    navigate(path);
  };

  const renderMovieList = (genreId) => {
    const genreFilms = films.find((genre) => genre.genreId === genreId)?.films || [];
    const emptyDivsCount = Math.max(20 - genreFilms.length, 0);
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
    const emptyDivs = Array(emptyDivsCount).fill(<div key={genreId} className="empty-movie" />);
    return movieElements.concat(emptyDivs);
  };

  const renderGenres = () => {
    return (
      <div>
        {films.map((genre) => (
          <div key={genre.genreId} className='movieList'>
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
          <div>
            {renderGenres()}
          </div>
        </>
      )}
    </>
  );
};

export default Films;
