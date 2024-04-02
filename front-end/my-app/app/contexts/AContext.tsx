import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  access_token: string | null;
  userId: number | null;
  username: string | null;
  login: (access_token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access_token, setAccess_token] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const login = (access_token: string) => {
    setIsLoggedIn(true);
    setAccess_token(access_token);
    localStorage.setItem("access_token", access_token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccess_token(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, access_token }}>
      {children}
    </AuthContext.Provider>
  );
};
