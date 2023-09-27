import React, { useState, useContext, useEffect } from "react";
import ForumPostList from "../../components/Forum/Forum";
import "./Forum.css";
import { UserContext } from '../../context/userContext';
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";


function ForumPage() {
  const [postContent, setPostContent] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const { user, username } = useContext(UserContext);

useEffect(()=>{
  axios
			.get(`http://localhost:3001/api/getPosts`)
			.then((response) => {
				setForumPosts(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
},[])


  const handlePostSubmit = async() => {
    const requestData = {
      uid: user.uid,
      username: username,
      postText: postContent
    };
    const response = await axios.post(
      'http://localhost:3001/api/createPost',
      requestData
    );
    console.log(response.data)
    setForumPosts([requestData, ...forumPosts]);
    setPostContent("");
  };

  return (
    <div className="form-container">
      <h2>Create a Forum Post</h2>
      <textarea
        id="forumBox"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your post here"
      ></textarea>
      <button className="button" onClick={handlePostSubmit}>
        Submit
      </button>
      <ForumPostList posts={forumPosts.reverse()} setForumPosts = {setForumPosts}/>
    </div>
  );
}

export default ForumPage;
