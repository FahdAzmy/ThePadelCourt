import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { AuthContext } from "../Contexts/AuthContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userRole } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className="bg-transparent p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Right side (PadelCourt) */}
        <div className="text-3xl md:text-4xl font-extrabold text-lime-500">
          <Link to={"/"}>PadelCourt</Link>
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
        {isLoggedIn && (
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
            isActive ? "bg-gray-500" : ""
          }`
        }
      >
              Home
            </NavLink>
            <NavLink
        to="/courts"
        className={({ isActive }) =>
          `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
            isActive ? "bg-gray-500" : ""
          }`
        }
      >
              Courts
            </NavLink>
            <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
            isActive ? "bg-gray-500" : ""
          }`
        }
      >
              Profile
            </NavLink>
            {userRole === "owner" && (
               <NavLink
               to="/ownerpage"
               className={({ isActive }) =>
                 `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
                   isActive ? "bg-gray-500" : ""
                 }`
               }
             >
                MyCourts
              </NavLink>
            )}
          </div>
        )}

        {/* Left side (Login/Signup or Logout) for medium and large screens */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r font-bold bg-rose-900 text-white px-4 py-2 rounded-lg shadow-lg hover:from-lime-900 hover:to-blue-900 transition duration-300 transform hover:scale-105"
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
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <NavLink
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
            isActive ? "bg-gray-500" : ""
          }`
        }
            
          >
            Home
          </NavLink>
          <NavLink
        to="courts"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
            isActive ? "bg-gray-500" : ""
          }`
        }
            
          >
            Courts
          </NavLink>
          <NavLink
        to="profile/settings"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
            isActive ? "bg-gray-500" : ""
          }`
        }
            
          >
            Profile
          </NavLink>

          {userRole === "owner" && (
             <NavLink
             to="/ownerpage"
             onClick={() => setIsMenuOpen(false)}
             className={({ isActive }) =>
               `flex items-center  text-lime-300 text-lg font-bold hover:text-green-600 transition duration-300 p-2 rounded-lg hover:bg-gray-300 ${
                 isActive ? "bg-gray-500" : ""
               }`
             }
                 
               >
              MyCourts
            </NavLink>
          )}

          {isLoggedIn ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
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
