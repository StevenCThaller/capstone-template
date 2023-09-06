import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, year, image }) => {
  return (
    <div className="movie-card">
      <h2 className="movie-title">{title}</h2>
      <img src={image} alt={title} />
      <div className="movie-info">
        <p>Year: {year}</p>
      </div>
      <button>Discuss</button>
    </div>
  );
};

export default MovieCard;
