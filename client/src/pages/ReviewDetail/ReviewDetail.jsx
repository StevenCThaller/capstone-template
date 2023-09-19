import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import LogoHeader from '../../components/Header/Header';

const ReviewDetail = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const { reviewID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/review/${reviewID}`)
      .then((response) => {
        setReviewDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(reviewDetails);

  return (
    <div>
      <LogoHeader />
      <NavBar />
      <div className="review" style={{ margin: "auto" }}>
        <div className="user-info">
          <h4 className="user-name">User: {reviewDetails.username}</h4>
          <h3 className="review-star-rating">
            ★ {reviewDetails.Rating}/5
          </h3>
        </div>
        {reviewDetails.commentText ? (
          <>
            <p>Comment: {reviewDetails.commentText}</p>
          </>
        ) : (
          <p>No Review</p>
        )}
      </div>
      <div className="review-area">
        <h2 id="review">Leave a Reply</h2>
        <div className="review-card">
          <textarea
            id="reviewArea"
            rows="2"
            cols="50"
            placeholder="Enter your review here"
            style={{
              borderRadius: "5px",
              padding: "10px",
            }}
          />
          <button id="submit">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
