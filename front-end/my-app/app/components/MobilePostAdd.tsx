"use client";
import React, { useState } from "react";
import { addPost } from "../lib/postApi";
import { useUser } from "../contexts/UserContext";
import { useAddPost } from "../contexts/AddPost";

export const MobilePostAdd = () => {
  const { isAddingPost, setIsAddingPost } = useAddPost();
  const [post, setPost] = useState("");
  const { user } = useUser();
  console.log(user);
  const addPostHandler = async () => {
    try {
      await addPost({ content: post, user: user });
      setPost("");
    } catch (error) {
      console.error(error);
    }
    setIsAddingPost(!isAddingPost);
    window.location.reload();
  };

  return (
    <div className=" h-screen">
      <textarea
        onChange={(e) => setPost(e.target.value)}
        className="w-full h-1/2 text-slate-500 p-2"
        placeholder="What's on your mind?"
      ></textarea>
      <button
        onClick={addPostHandler}
        className="bg-blue-500 text-white w-full h-10"
      >
        Post
      </button>
    </div>
  );
};
