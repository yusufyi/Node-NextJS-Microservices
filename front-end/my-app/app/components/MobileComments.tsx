import React from "react";

interface Comment {
  id: number;
  postId: number;
  comment: string;
}
const MobileComments = ({ comment }: { comment: Comment }) => {
  return <div className="border-t-2 py-3 ">{comment.comment}</div>;
};

export default MobileComments;
