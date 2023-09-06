import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import MovieGrid from '../components/MovieGrid'
import NavBar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
	const { setUser, user } = useContext(UserContext);
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		// Make the HTTP request using Axios
		axios.get('http://localhost:3001/api/movies')
		  .then((response) => {
			// Access the data from the response
			setMovies(response.data);
			// You can now use response.data for further processing
		  })
		  .catch((error) => {
			// Handle any errors that occur during the request
			console.error('Error fetching data:', error);
		  });
	  }, []);
	  console.log(movies)

	  const handleSearch = (query) => {
		console.log('Searching for:', query);
	  };

	  return (
		<div>
		  <h1>Terror Time Machine</h1>
		  <h2>User: {user}</h2>
		  <NavBar/>
		  <SearchBar onSearch={handleSearch} />
		  <div className="movie-list">
			<MovieGrid movies={movies} />
		  </div>
		</div>
	  );
};

export default HomePage;
