import React from "react";
import { useAddPost } from "../contexts/AddPost";

export const MobileDasboardFooter = () => {
  const { isAddingPost, setIsAddingPost } = useAddPost();
  //console.log("ADDPOST", isAddingPost);

  return (
    <div className=" w-full flex opacity-200  border-b-2 sticky border-slate-200  backdrop-blur bg-slate-200 bg-opacity-25  text-slate-500  bottom-0  left-0 h-24 justify-between items-center p-4">
      <svg viewBox="0 0 1024 1024" fill="currentColor" height="2em" width="2em">
        <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
      </svg>{" "}
      <svg
        onClick={() => setIsAddingPost(!isAddingPost)}
        fill="none"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13 7a1 1 0 10-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
