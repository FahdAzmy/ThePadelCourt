import { useContext, useState } from "react";
import { Menu, Search, UserCircle, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Cookies from "js-cookie";
import Logo from "./Logo";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userRole } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/login");
  }

  const navLinkClass = ({ isActive }) =>
    `premium-nav-link ${isActive ? "active" : ""}`;

  return (
    <>
      <header className="premium-navbar">
        <Link to="/" className="premium-brand" aria-label="ThePadelCourt home">
          <Logo width={40} height={40} className="premium-logo" />
          <span>ThePadelCourt</span>
        </Link>

        <nav className="premium-links" aria-label="Primary navigation">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/courts" className={navLinkClass}>Courts</NavLink>
          <NavLink to="/memberships" className={navLinkClass}>Memberships</NavLink>
          {isLoggedIn && userRole === "owner" && (
            <NavLink to="/ownerpage" className={navLinkClass}>My Courts</NavLink>
          )}
        </nav>

        <div className="premium-actions">
          <button className="icon-button" aria-label="Search courts">
            <Search size={19} strokeWidth={2.2} />
          </button>
          <Link className="icon-button" to={isLoggedIn ? "/profile" : "/login"} aria-label="Profile">
            <UserCircle size={20} strokeWidth={2.2} />
          </Link>
          <Link className="book-now-button" to="/courts">Book Now</Link>
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu-panel">
          <NavLink to="/" end className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/courts" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Courts</NavLink>
          <NavLink to="/memberships" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Memberships</NavLink>
          {isLoggedIn && (
            <NavLink to="/profile" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
          )}
          {isLoggedIn && userRole === "owner" && (
            <NavLink to="/ownerpage" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>My Courts</NavLink>
          )}
          <div className="mobile-menu-actions">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}

      <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
        <NavLink to="/courts">
          <span className="material-symbols-outlined">sports_tennis</span>
          <span>Explore</span>
        </NavLink>
        <NavLink to={isLoggedIn ? "/profile/reservations" : "/login"}>
          <span className="material-symbols-outlined">event_available</span>
          <span>Bookings</span>
        </NavLink>
        <a href="/#stats">
          <span className="material-symbols-outlined">leaderboard</span>
          <span>Stats</span>
        </a>
        <NavLink to={isLoggedIn ? "/profile" : "/login"}>
          <span className="material-symbols-outlined">person</span>
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
