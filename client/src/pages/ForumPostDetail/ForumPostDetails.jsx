import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const ForumPostDetails = () => {
    const {postID} = useParams()
    const [postDetails, setPostDetails] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3001/api/getOnePost/${postID}`)
      .then((response) => {
        const reversedReplies = response.data.Replies.reverse();
      setPostDetails({ ...response.data, Replies: reversedReplies });
      })
      .catch((error) => {
        console.log(error);
      });
    },[])

    console.log(postDetails)
  return (
    <div>Post Details for :{postID}</div>
  )
}

export default ForumPostDetails