import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext.jsx"; // Make sure this path is correct

const withGuard = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/"); // Redirect to homepage if not logged in
      }
    }, [isLoggedIn, navigate]);

    // If the user is logged in, render the component
    return isLoggedIn ? <Component {...props} /> : null;
  };

  return Wrapper;
};

export default withGuard;
