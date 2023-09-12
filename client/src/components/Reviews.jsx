import React, { useState } from "react";
import './Reviews.css';

function Reviews() {
  const [commentText, setCommentText] = useState("");

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };
  const handleSubmit = () => {};

  return (
    <div>
      <h2 id="review">
        Leave a Review</h2>
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
          fontFamily: "cursive",
        }}
      />
      <button id="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Reviews;
