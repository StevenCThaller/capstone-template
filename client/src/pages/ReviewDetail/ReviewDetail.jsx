import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import LogoHeader from '../../components/Header/Header';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import ReplyForm from '../../components/Reply/ReplyForm';
import ReplyCard from '../../components/ReplyCard/ReplyCard';

const ReviewDetail = () => {
  const [reviewDetails, setReviewDetails] = useState([]);
  const [reviewPosted, setReviewPosted] = useState(false)
  const { reviewID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/review/${reviewID}`)
      .then((response) => {
        setReviewDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviewPosted]);

  return (
    
    <div>
     {reviewDetails && Object.keys(reviewDetails).length > 0 && (
        <>
        <LogoHeader />
        <NavBar />
        <ReviewCard reviewDetails={reviewDetails}/>
        <ReplyForm reviewDetails={reviewDetails} setReviewPosted={setReviewPosted}/>
       <ReplyCard reviewDetails={reviewDetails}/>
        </>
      )}
    </div>
  );
};

export default ReviewDetail;
