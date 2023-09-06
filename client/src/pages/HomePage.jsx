import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

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
	return (
		<>
			<div>
				<h1>HomePage</h1>
				<h1>User: {user}</h1>
			</div>
		</>
	);
};

export default HomePage;
