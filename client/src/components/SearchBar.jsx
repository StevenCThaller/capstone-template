import React, { useState } from 'react';

const SearchBar = ({ onSearch, setFilteredMovies, movies }) => {
  const [query, setQuery] = useState('');

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
      <button onClick={clearSearch}>clear search</button>
    </form>
  );
};

export default SearchBar;