import React from "react";
import { MobilePosts } from "./MobilePosts";
import { MobileList } from "./MobileList"; // Assuming you have a MobileList component
import { DummyPosts } from "../utils/data"; // Change DummyPosts to Posts
import { MobileDashboardHeader } from "./MobileDashboardHeader";
import { MobileDasboardFooter } from "./MobileDasboardFooter";

const MobileDashboard: React.FC = () => {
  console.log(DummyPosts);
  return (
    <div className="container  relative mx-auto  max-w-lg max-h-lg lg:max-h-full h-screen bg-slate-50 overflow-auto">
      {/* Your component content */}
      <MobileDashboardHeader />
      <MobileList>
        {DummyPosts.map(
          (
            post // Changed DummyPosts to Posts
          ) => (
            <MobilePosts
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              avatar={post.avatar}
            />
          )
        )}
      </MobileList>
      <MobileDasboardFooter />
    </div>
  );
};

export default MobileDashboard;
