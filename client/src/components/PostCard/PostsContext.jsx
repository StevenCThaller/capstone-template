import React, { createContext, useState, useContext, useCallback } from "react";
import api from "../../../utils/api.utils";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      if (response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error(`Error fetching posts:`, error);
    }
  };

  const addPost = async postData => {
    try {
      const response = await api.post("/posts", postData);
      if (response.data) {
        setPosts(prevPosts => [response.data, ...prevPosts]);
      }
    } catch (error) {
      console.error(`Error creating post:`, error);
    }
  };

  const handleDeletePost = async postId => {
    try {
      const res = await api.delete(`/posts/${postId}`);
      if (res.status === 200) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } else {
        console.error("Failed to delete post:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PostsContext.Provider
      value={{ posts, fetchPosts, addPost, handleDeletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
