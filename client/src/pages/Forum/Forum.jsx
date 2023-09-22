import React, { useState, useContext } from "react";
import ForumPostList from "../../components/Forum/Forum";
import "./Forum.css";
import { UserContext } from '../../context/userContext';
import NavBar from "../../components/NavBar/NavBar";


function ForumPage() {
  const [postContent, setPostContent] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const { username } = useContext(UserContext);


  const handlePostSubmit = () => {
    const newPost = {
      id: Date.now(),
      content: postContent,
      author: username,
    };
    setForumPosts([newPost, ...forumPosts]);
    setPostContent("");
  };

  return (
    <div className="form-container">
      <NavBar />
      <h1>Create a Forum Post</h1>
      <textarea
        id="forumBox"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your post here"
      ></textarea>
      <button className="button" onClick={handlePostSubmit}>
        Submit
      </button>
      <ForumPostList posts={forumPosts.reverse()}/>
    </div>
  );
}

export default ForumPage;
