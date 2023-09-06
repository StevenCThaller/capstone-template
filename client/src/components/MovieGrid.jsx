import React from 'react';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          year={movie.release_date.substring(0, 4)}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
