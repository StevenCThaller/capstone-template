import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieDetailCard from '../../components/MovieDetailCard/MovieDetailCard';
import LogoHeader from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import './MovieDetail.css';
import Reviews from '../../components/Reviews/Reviews';
import ReviewsList from '../../components/ReviewsList/ReviewsList';

const MovieDetail = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState();
  	const [reviews, setReviews] = useState([])
  	console.log("reviews", reviews)

	const handleReviewSubmit = (newReview) => {
		setReviews([...reviews, newReview]); 
	};

	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/movieByID/${id}`)
			.then((response) => {
				setMovie(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});

      axios
			.get(`http://localhost:3001/api/movieReviews/${id}`)
			.then((response) => {
				setReviews(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [id]);
	return (
		<div>
			<LogoHeader />
			<NavBar />
			{movie && (
				<>
					<div className='movie-container'>
						<h1>{movie.title}</h1>
						<MovieDetailCard
							title={movie.title}
							year={movie.release_date}
							image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							id={movie.id}
							overview={movie.overview}
							runtime={movie.runtime}
							genres={movie.genres}
							tagline={movie.tagline}
						/>
					</div>
					<Reviews movieID={movie.id} onReviewSubmit={handleReviewSubmit}/>
					<ReviewsList reviews={reviews} />
				</>
			)}
		</div>
	);
};

export default MovieDetail;
