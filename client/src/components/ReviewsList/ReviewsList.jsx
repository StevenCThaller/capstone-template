import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ReviewsList.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';


const ReviewsList = ({ reviews, setReviews }) => {
  const navigate = useNavigate()
 const { user } = useContext(UserContext); 
  const handleDeleteReview = (reviewID) => {
    axios
			.delete(`http://localhost:3001/api/deleteReview/${user.uid}/${reviewID}`)
			.then((response) => {
				console.log("review Deleted")
        const updatedReviews = reviews.filter((review) => review._id !== reviewID);
        setReviews(updatedReviews);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
  };
 
    return (
<div className="reviews-section">
      <h2>User Reviews</h2>
      <div className="review-container">
        {reviews.length > 0 && user ? (
          reviews.map((review) => (
            <div className="review" key={review._id}>
              <div className="user-info">
                <h4 className="user-name">User: {review.username}</h4>
                <h3 className="review-star-rating">
                  ★ {review.Rating}/5
                </h3>
              </div>
              {review.commentText ? (
                <>
                  <p>Comment: {review.commentText}</p>
                  <div className="thumbs">
                    <FontAwesomeIcon className="icon-up" icon={faThumbsUp} />
                    <FontAwesomeIcon className="icon-down" icon={faThumbsDown} />
                  </div>
                </>
              ) : (
                <p>No Review</p>
              )}
              {user.uid == review.uid && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReview(review._id)}
                  style={{width: "50px"}}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
              <button className="reply-button" onClick={() => navigate(`/reviewDetail/${review._id}`)}>Reply</button>
            </div>
          ))
        ) : (
          <p>No user reviews yet. Start the conversation!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;