import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyList from './components/MyList';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetail';
import Films from './components/pages/Films.js';
import './App.css';
import './Reset.css';
import './Movie.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/serie/:serieId" element={<MovieDetails />} />
        <Route path="/films" element={<Films />} />
        <Route path="/series" element={<Films isSerie={true} />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </Router>
  );
}

export default App;
