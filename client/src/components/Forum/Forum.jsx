import React from "react";

function ForumPostList({ posts }) {
  const reversedPosts = [...posts].reverse();

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {reversedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.username}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ForumPostList;
