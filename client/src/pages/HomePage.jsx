import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import MovieGrid from '../components/MovieGrid';
import NavBar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import './HomePage.css';
import Reviews from '../components/Reviews';

const HomePage = () => {
	const { setUser, user, username, setUsername } = useContext(UserContext);
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredMovies, setFilteredMovies] = useState(null);
	const [pagnatedMovies, setPagnatedMovies] = useState([]);
	console.log('pagnated movies', pagnatedMovies);
	useEffect(() => {
		axios
			.get('http://localhost:3001/api/movies')
			.then((response) => {
				setMovies(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/moviesByPage/${currentPage}`)
			.then((response) => {
				setPagnatedMovies(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [currentPage]);

	const handleSearch = (query) => {
		console.log('Searching for:', query);
	};

	const handleNextPage = () => {
		if(currentPage < 13){
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	
	return (
		<div>
			<h1>Terror Time Machine</h1>
			<h2>Hello {username}!</h2>
			<NavBar />
			<SearchBar
				onSearch={handleSearch}
				movies={movies}
				setFilteredMovies={setFilteredMovies}
				/>
				{filteredMovies === null && (
					<div>
						<button onClick={handlePrevPage} disabled={currentPage === 1}>
							Previous Page
						</button>
						<button onClick={handleNextPage} disabled={currentPage === 13}>Next Page</button>
					</div>
				)}
			<div className='movie-list'>
				<MovieGrid
					movies={filteredMovies !== null ? filteredMovies : pagnatedMovies}
				/>
			</div>
			{filteredMovies === null && (
				<div>
					<button onClick={handlePrevPage} disabled={currentPage === 1}>
						Previous Page
					</button>
					<button onClick={handleNextPage} disabled={currentPage === 13}>Next Page</button>
				</div>
			)}
		</div>
	);
};

export default HomePage;
