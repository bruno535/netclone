import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetail';
import Films from './components/pages/Films.js';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/films" element={<Films />} />
      </Routes>
    </Router>
  );
}

export default App;
