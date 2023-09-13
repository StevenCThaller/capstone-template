import React, { useState, useContext } from "react";
import StarRating from "../StarRating/StarRating"
import './Reviews.css';
import { UserContext } from "../../context/userContext";
import axios from "axios";

function Reviews({movieID}) {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const {user, username} = useContext(UserContext)

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async() => {
    const requestData = {
      uid: user,
      username: username,
      movieID: movieID,
      Rating: rating,
      commentText: commentText
    };
    const response = await axios.post(
      'http://localhost:3001/api/review',
      requestData
    );
    console.log(response.data)
  };

  return (
    <div className="review-area">
      <h2 id="review">
        Leave a Review</h2>
      <div className="review-card">
        <textarea
          id="reviewArea"
          rows="2"
          cols="50"
          placeholder="Enter your review here"
          value={commentText}
          onChange={handleInputChange}
          style={{
            borderRadius: "5px",
            padding: "10px",
          }}
        />
        <div className="star-rating-container">
        <StarRating onRatingChange={handleRatingChange} />
        </div>
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Reviews;
