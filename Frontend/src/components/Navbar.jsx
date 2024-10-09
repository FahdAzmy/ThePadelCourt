import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { AuthContext } from "../Contexts/AuthContext";
import Cookies from "js-cookie";

const Navbar = () => {
  // Simulate user authentication status
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle user logout: remove token cookie, update authentication state, and navigate to login page
  function handleLogout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  }
  return (
    <nav className="bg-transparent p-4  fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Right side (PadelCourt) */}
        <div className="text-3xl md:text-4xl  font-extrabold text-lime-500">
          PadelCourt
        </div>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Center (Links) for medium and large screens */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/courts"
            className="text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300"
          >
            Courts
          </Link>
          <Link
            to="/about"
            className="text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Left side (Login/Signup or Logout) for medium and large screens */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r font-bold bg-rose-900 text-white px-4 py-2  rounded-lg shadow-lg hover:from-lime-900 hover:to-blue-900 transition duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r font-bold bg-sky-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-sky-600 transition duration-300 transform hover:scale-105"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link
            to="/courts"
            className="text-gray-700 font-semibold hover:text-green-600 transition duration-300"
          >
            Courts
          </Link>
          <Link
            to="/about"
            className="text-gray-700 font-semibold hover:text-green-600 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 font-semibold hover:text-green-600 transition duration-300"
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
