import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NextResponse, NextRequest } from "next/server";
import { useAuth } from "../contexts/AContext";

export const GetPost = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const { access_token, logout } = useAuth();
  useEffect(() => {
    console.log("f:", access_token, "bb:");

    if (access_token) {
      fetch("http://localhost:3005/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data:", data);
          console.log(data);
          setPosts(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleCreatePost = () => {
    fetch("http://localhost:3005/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        content: content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts([...posts, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Add any additional logic you need here
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
      <div>
        <h1 className="text-2xl font-semibold">Add Posts</h1>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 p-2 rounded-md w-full"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Content"
          className="border border-gray-300 p-2 rounded-md w-full mt-2"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Create Post
        </button>
      </div>
      {posts.map((p) => (
        <div key={p.id} className="bg-white shadow-md p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-2">{p.title}</h1>
          <p className="text-base">{p.content}</p>
        </div>
      ))}
    </div>
  );
};
