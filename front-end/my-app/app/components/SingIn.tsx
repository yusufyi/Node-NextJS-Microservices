import React, { use } from "react";
import { useAuth } from "../contexts/AContext";
import { access } from "fs";
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
export const SingIn = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test5",
          password: "test5",
        }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.access_token);
      login(data.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
