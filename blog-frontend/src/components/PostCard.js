import React from "react";

const PostCard = ({ post }) => (
  <div>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <p><i>By: {post.user?.username || "Unknown"}</i></p>
  </div>
);

export default PostCard;
