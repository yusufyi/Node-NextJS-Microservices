import React, { use, useEffect, useState } from "react";
import { MobileList } from "./MobileList"; // Assuming you have a MobileList component
import { DummyPosts } from "../utils/data"; // Change DummyPosts to Posts
import { MobileDashboardHeader } from "./MobileDashboardHeader";
import { MobileDasboardFooter } from "./MobileDasboardFooter";
import { getPosts } from "../lib/postApi"; // Added this line
import dynamic from "next/dynamic";
const MobilePosts = dynamic(() => import("./MobilePosts"));
interface Comment {
  id: number;
  postId: number;
  comment: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  avatar: string;
  comments: Comment[];
}
const MobileDashboard: React.FC = () => {
  const [Posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  []; // Added this line
  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container  relative mx-auto  max-w-lg h-screen bg-slate-50 overflow-auto">
      {/* Your component content */}
      <MobileDashboardHeader />
      <MobileList>
        {Posts.map(
          (
            post // Changed DummyPosts to Posts
          ) => (
            <MobilePosts
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              avatar={post.avatar}
              comments={post.comments}
            />
          )
        )}
      </MobileList>
      <MobileDasboardFooter />
    </div>
  );
};

export default MobileDashboard;
