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
	const [username, setUsername] = useState()

	useEffect(() => {
		axios.get('http://localhost:3001/api/movies')
		  .then((response) => {
			setMovies(response.data);
		  })
		  .catch((error) => {
			console.error('Error fetching data:', error);
		  });
	  }, []);

	  useEffect(()=>{
		axios.get(`http://localhost:3001/api/user/${user}`)
		  .then((response) => {
			setUsername(response.data.username);
		  })
		  .catch((error) => {
			console.error('Error fetching data:', error);
		  });
	  },[])

	  const handleSearch = (query) => {
		console.log('Searching for:', query);
	  };

	  return (
		<div>
		  <h1>Terror Time Machine</h1>
		  <h2>Hello {username}!</h2>
		  <NavBar/>
		  <SearchBar onSearch={handleSearch} />
		  <div className="movie-list">
			<MovieGrid movies={movies} />
		  </div>
		</div>
	  );
};

export default HomePage;
