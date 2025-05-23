import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/api";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default Home;
