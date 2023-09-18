import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import MovieGrid from '../../components/MovieGrid/MovieGrid'
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import axios from 'axios';
import './HomePage.css';
import Reviews from '../../components/Reviews/Reviews';
import ContactForm from '../ContactPage/ContactPage';

const HomePage = () => {
	const { setUser, user, username, setUsername } = useContext(UserContext);
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredMovies, setFilteredMovies] = useState(null);
	const [pagnatedMovies, setPagnatedMovies] = useState([]);
	
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
			<div className='search-bar'>
				<SearchBar
					onSearch={handleSearch}
					movies={movies}
					setFilteredMovies={setFilteredMovies}
					/>
			</div>
			<div className='top-page-buttons'>
				{filteredMovies === null && (
					<div>
						<button onClick={handlePrevPage} disabled={currentPage === 1}>
							Previous Page
						</button>
						<button onClick={handleNextPage} disabled={currentPage === 13}>Next Page</button>
					</div>
				)}
			</div>
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
