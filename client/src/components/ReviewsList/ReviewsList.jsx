import React from 'react';
import StarRating from '../StarRating/StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './ReviewsList.css';
import { useNavigate } from 'react-router-dom';


const ReviewsList = ({ reviews }) => {
  const navigate = useNavigate()
    return (
      <div className="reviews-section">
        <h2>User Reviews</h2>
        <div className="review-container">
          {reviews.map((review) => (
            <div className="review">
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
            )
            }
            <button className="reply-button" onClick={()=>navigate(`/reviewDetail/${review._id}`)}>Reply</button>
          </div>          
          ))}
        </div>
      </div>
    );
  };
  

export default ReviewsList;






