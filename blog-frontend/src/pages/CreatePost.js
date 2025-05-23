import React from "react";
import { createPost } from "../services/api";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createPost(data);
    alert("Post created");
    navigate("/dashboard");
  };

  return <PostForm onSubmit={handleSubmit} />;
};

export default CreatePost;
