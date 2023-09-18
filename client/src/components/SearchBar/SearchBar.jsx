import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, setFilteredMovies, movies }) => {
  const [query, setQuery] = useState('');
  console.log("movies in searchbar", movies)

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const changedQuery = query.trim().toLowerCase();
    const filteredResults = movies.filter((movie) => {
      const movieTitle = movie.title.toLowerCase(); 
      return movieTitle.includes(changedQuery);
  });
  onSearch(changedQuery); 
  setFilteredMovies(filteredResults);
};

const clearSearch = () =>{
  setQuery('')
  setFilteredMovies(null)
}

  return (
    <form>
      <input
        type="text"
        placeholder="Search for movie..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>Search</button>
      <button onClick={clearSearch}>Clear Search</button>
    </form>
  );
};

export default SearchBar;