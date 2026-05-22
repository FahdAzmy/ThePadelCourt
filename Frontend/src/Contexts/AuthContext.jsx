/* eslint-disable react/prop-types */
import { createContext, useCallback, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Use default import
export const AuthContext = createContext();

const getAuthStateFromCookie = () => {
  const cookieValue = Cookies.get("token");

  if (!cookieValue) {
    return { isLoggedIn: false, userRole: null };
  }

  try {
    const decodedToken = jwtDecode(cookieValue);
    return { isLoggedIn: true, userRole: decodedToken.role };
  } catch (error) {
    console.error("Error decoding token:", error);
    return { isLoggedIn: false, userRole: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getAuthStateFromCookie);

  const setIsLoggedIn = useCallback((nextIsLoggedIn) => {
    if (!nextIsLoggedIn) {
      setAuthState({ isLoggedIn: false, userRole: null });
      return;
    }

    setAuthState(getAuthStateFromCookie());
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      setIsLoggedIn,
      userRole: authState.userRole,
    }),
    [authState.isLoggedIn, authState.userRole, setIsLoggedIn]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
