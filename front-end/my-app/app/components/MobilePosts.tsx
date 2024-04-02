import React from "react";
import { MobilePostBottom } from "./MobilePostBottom";

interface MobilePostsProps {
  id: number;
  title: string;
  body: string;
  avatar: string;
}

export const MobilePosts: React.FC<MobilePostsProps> = ({
  id,
  title,
  body,
  avatar,
}) => {
  return (
    <article className="flex items-start space-x-2 px-2 pt-2 pb-6">
      <img
        src={avatar}
        alt="Avatar"
        width="40"
        height="40"
        className=" rounded-full bg-slate-100"
      />

      <div className="w-full ">
        <div className=" font-semibold text-slate-900 ">John Mike</div>
        <div className="text-slate-500"> {body}</div>
        <MobilePostBottom />
      </div>
    </article>
  );
};
