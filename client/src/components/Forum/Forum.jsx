import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function ForumPostList({ posts, setPosts }) {
  const reversedPosts = [...posts].reverse();
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const handleDeleteReview = (postID) => {
    axios
			.delete(`http://localhost:3001/api/deletePost/${user.uid}/${postID}`)
			.then((response) => {
				console.log("Post Deleted")
        const updatedPosts = posts.filter((post) => post._id !== postID);
        setPosts(updatedPosts);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {reversedPosts.map((post) => (
          <div key={post._id}>
            <li key={post._id}>
              <strong>{post.username}</strong>: {post.postText}
            </li>
            {user.uid == post.uid && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReview(post._id)}
                >
                  <div>
                  <FontAwesomeIcon icon={faTrash} />
                  </div>
                </button>
              )}
            <button onClick={()=>navigate(`/postDetails/${post._id}`)}>Reply</button>
          </div>
        ))}
      </ul>
    </div>
  );
}


export default ForumPostList;
