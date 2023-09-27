import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import SortMovies from '../../components/FilterMovies/FilterMovies';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import './HomePage.css';
import Reviews from '../../components/Reviews/Reviews';
import ContactForm from '../ContactPage/ContactPage';

const HomePage = () => {
	const { username } = useContext(UserContext);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredMovies, setFilteredMovies] = useState(null);
	const [pagnatedMovies, setPagnatedMovies] = useState([]);
	const [loadingMovies, setLoadingMovies] = useState(false);

	const moviesPerPage = 20;
	const startIndex = (currentPage - 1) * moviesPerPage;
	const endIndex = startIndex + moviesPerPage;
	const paginatedSortedMovies =
		filteredMovies !== null ? filteredMovies.slice(startIndex, endIndex) : [];
	const maxPages = Math.ceil((filteredMovies?.length || 0) / moviesPerPage);

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
		if (currentPage < 13) {
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
			<h2>Hello {username}!</h2>
			<div className='sort'>
				<SortMovies
					onSearch={handleSearch}
					setFilteredMovies={setFilteredMovies}
					setLoadingMovies={setLoadingMovies}
				/>
			</div>
			<div className='search-bar'>
				<SearchBar
					onSearch={handleSearch}
					setFilteredMovies={setFilteredMovies}
					setLoadingMovies={setLoadingMovies}
				/>
			</div>
			<div className='top-page-buttons'>
				<div>
					<button onClick={handlePrevPage} disabled={currentPage === 1}>
						Previous Page
					</button>
					<button
						onClick={handleNextPage}
						disabled={
							(filteredMovies === null && currentPage === 13) ||
							(filteredMovies !== null && currentPage === maxPages)
						}>
						Next Page
					</button>
				</div>
			</div>
			<div className='movie-list'>
				{loadingMovies ? (
					<h3>
						<LoadingSpinner /> Loading Movies
					</h3>
				) : (
					<MovieGrid
						movies={
							filteredMovies !== null ? paginatedSortedMovies : pagnatedMovies
						}
					/>
				)}
			</div>
			<div>
				<button onClick={handlePrevPage} disabled={currentPage === 1}>
					Previous Page
				</button>
				<button
						onClick={handleNextPage}
						disabled={
							(filteredMovies === null && currentPage === 13) ||
							(filteredMovies !== null && currentPage === maxPages)
						}>
						Next Page
					</button>
			</div>
		</div>
	);
};

export default HomePage;
