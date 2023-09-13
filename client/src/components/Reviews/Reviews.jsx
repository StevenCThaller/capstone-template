import React, { useState } from "react";
import StarRating from "../StarRating/StarRating"
import './Reviews.css';

function Reviews() {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (commentText.trim() !== "" && rating > 0) {
      console.log("Review submitted:", commentText, "Rating:", rating);
      setCommentText("");
      setRating(0);
    }
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
