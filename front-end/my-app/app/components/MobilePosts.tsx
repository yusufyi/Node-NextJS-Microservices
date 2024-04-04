import React from "react";
import { MobilePostBottom } from "./MobilePostBottom";
import { comment } from "postcss";
import dynamic from "next/dynamic";

const MobileComments = dynamic(() => import("./MobileComments"));
interface MobilePostsProps {
  id: number;
  title: string;
  username: string;
  body: string;
  avatar: string;
  comments: Comment[];
}
interface Comment {
  id: number;
  postId: number;
  comment: string;
}
export default function MobilePosts({
  id,
  title,
  username,
  body,
  avatar,
  comments,
}: MobilePostsProps) {
  // Your code here

  //console.log(comments);
  const [showComments, setShowComments] = React.useState(false);

  return (
    <article
      className="flex items-start space-x-2 px-2 pt-2 pb-6"
      onClick={() => setShowComments(!showComments)}
    >
      <img
        src={avatar}
        alt="Avatar"
        width="40"
        height="40"
        className=" rounded-full bg-slate-100"
      />

      <div className="w-full ">
        <div className=" font-semibold text-slate-900 ">{username}</div>
        <div className="text-slate-500"> {body}</div>
        {showComments && comments.length > 0 && (
          <div className="text-slate-500">
            {comments.map((comment) => (
              <MobileComments key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        <MobilePostBottom comments={comments} />
      </div>
    </article>
  );
}
