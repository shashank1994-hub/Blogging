import React, { useEffect, useState } from "react";
import { getMyPosts } from "../services/api";
import PostCard from "../components/PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMyPosts().then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>My Posts</h2>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default Dashboard;
