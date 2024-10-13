/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Use default import
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const cookieValue = Cookies.get("token");

    if (cookieValue) {
      try {
        const decodedToken = jwtDecode(cookieValue); // Decode the token
        setIsLoggedIn(true);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
    setIsLoading(false);
  }, [isLoggedIn, userRole]);

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
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
