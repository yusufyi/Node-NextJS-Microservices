import React from "react";
import { useAuth } from "../contexts/AContext";
import { SingIn } from "./SingIn";
import { GetPost } from "./GetPost";

export const Dashboard = () => {
  const { isLoggedIn, access_token } = useAuth();

  console.log(isLoggedIn);
  console.log(access_token);

  if (!isLoggedIn) {
    return (
      <div>
        <SingIn />
      </div>
    );
  }
  return (
    <div>
      <GetPost />
    </div>
  );
};
