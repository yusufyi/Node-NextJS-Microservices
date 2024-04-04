import React, { use, useEffect, useState } from "react";
import { MobileList } from "./MobileList"; // Assuming you have a MobileList component
import { DummyPosts } from "../utils/data"; // Change DummyPosts to Posts
import { MobileDashboardHeader } from "./MobileDashboardHeader";
import { MobileDasboardFooter } from "./MobileDasboardFooter";
import { getPosts } from "../lib/postApi"; // Added this line
import dynamic from "next/dynamic";
import { useAddPost } from "../contexts/AddPost";
import { MobilePostAdd } from "./MobilePostAdd";
import { useUser } from "../contexts/UserContext";
import router from "next/router";
const MobilePosts = dynamic(() => import("./MobilePosts"));
interface Comment {
  id: number;
  postId: number;
  comment: string;
}

interface Post {
  id: number;
  title: string;
  username: string;
  body: string;
  avatar: string;
  comments: Comment[];
}

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
}

const MobileDashboard: React.FC = () => {
  const { user } = useUser();
  console.log(user);

  const { isAddingPost } = useAddPost();
  const [Posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  []; // Added this line
  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
    setLoading(false);
    //console.log(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container  relative mx-auto  max-w-lg h-screen bg-slate-50 overflow-auto">
      {/* Your component content */}
      <MobileDashboardHeader />
      {isAddingPost ? (
        <MobilePostAdd />
      ) : (
        <MobileList>
          {Posts.map(
            (
              post // Changed DummyPosts to Posts
            ) => (
              <MobilePosts
                key={post.id}
                id={post.id}
                username={post.username}
                title={post.title}
                body={post.body}
                avatar={post.avatar}
                comments={post.comments}
              />
            )
          )}
        </MobileList>
      )}
      <MobileDasboardFooter />
    </div>
  );
};

export default MobileDashboard;
