import React from "react";

interface Comment {
  id: number;
  postId: number;
  comment: string;
}

export const MobilePostBottom: React.FC<{ comments: Comment[] }> = ({
  comments,
}) => {
  return (
    <div className="h-10 flex justify-between p- items-center">
      <div className="flex text-slate-400">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1.5em"
          width="1.5em"
        >
          <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
        </svg>
        {comments.length}
      </div>
    </div>
  );
};
