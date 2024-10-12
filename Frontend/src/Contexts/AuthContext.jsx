/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const cookieValue = Cookies.get("token");
    console.log("Cookie Value:", cookieValue);

    if (cookieValue) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [isLoggedIn]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
