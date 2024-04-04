"use client";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GetPost } from "./components/GetPost";
import { Dashboard } from "./components/Dashboard";
import { AuthProvider } from "./contexts/AContext";
import { AddPostProvider } from "./contexts/AddPost";
import { UserProvider } from "./contexts/UserContext";

export default function Home() {
  // const [token, setToken] = useState(null) as any;
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxMTgxNDEzNSwiZXhwIjoxNzExODI0OTM1fQ.Z7LSKzQWy0ZHqptLtNH4ZOBoXtdJiwbHEK37zsd_j5Y'
  //   if (token) {
  //     setToken(token);

  //   }
  //   else {
  //     redirect('/login')
  //   }
  //   console.log(token);
  // }, []);

  return (
    <UserProvider>
      <AddPostProvider>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </AddPostProvider>
    </UserProvider>
  );
}
