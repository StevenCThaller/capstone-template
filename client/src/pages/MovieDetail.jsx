import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MovieDetail = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState()
    console.log(id)
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/movieByID/${id}`)
		  .then((response) => {
			// Access the data from the response
			setMovie(response.data);
			// You can now use response.data for further processing
		  })
		  .catch((error) => {
			// Handle any errors that occur during the request
			console.error('Error fetching data:', error);
		  });
    }, [id])
    console.log(movie)
  return (
    <div>{movie && 
        <h1>{movie.title}</h1>
        }</div>
  )
}

export default MovieDetail