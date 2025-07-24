import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/authcontext';
import { HashLink } from 'react-router-hash-link';



function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isLoggedIn, user } = useContext(AuthContext);
  const role = user?.role;
  const username = user?.username;

  // Close dropdown on outside click


  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };
  const logout = () => {
  localStorage.removeItem('token'); // remove token
  window.location.reload(); // or navigate('/') if you want to redirect
};


  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">🤝SkillSahyog</Link>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div />
          <div />
          <div />
        </button>

        {/* Nav Links */}
        <ul className={`navbar-links ${mobileOpen ? 'active' : ''}`}>
          <li>
            <HashLink smooth to="/#home" onClick={() => setMobileOpen(false)}>
              Home
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#about" onClick={() => setMobileOpen(false)}>
              About
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#projects" onClick={() => setMobileOpen(false)}>
              Projects
            </HashLink>
          </li>
          

          {/* Mobile Auth Buttons */}
          {mobileOpen && !isLoggedIn && (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileOpen(false);
                  }}
                  className="menu-btn"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setMobileOpen(false);
                  }}
                  className="menu-btn signup"
                >
                  Signup
                </button>
              </li>
            </>
          )}

          {/* Mobile Profile Menu */}
          {mobileOpen && isLoggedIn && (
            <li className="profile-menu-mobile">
              <div className="profile-header" onClick={toggleDropdown}>
                <div className="avatar">{username?.charAt(0).toUpperCase()}</div>
                <span>{username}</span>
                <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
              </div>
              {dropdownOpen && (
                <div className="dropdown-mobile">
                  <Link
                    to={`/profile/${username}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                  {role === 'user' && (
                    <>
                      <Link
                        to="/applied-projects"
                        onClick={() => setMobileOpen(false)}
                      >
                        Applied Projects
                      </Link>
                      <Link
                        to="/browse-projects"
                        onClick={() => setMobileOpen(false)}
                      >
                        Browse Projects
                      </Link>
                    </>
                  )}
                  {role === 'ngo' && (
                    <>
                      <Link
                        to="/post-project"
                        onClick={() => setMobileOpen(false)}
                      >
                        Post Project
                      </Link>
                      <Link
                        to="/posted-projects"
                        onClick={() => setMobileOpen(false)}
                      >
                        Posted Projects
                      </Link>
                    </>
                  )}
                  <button onClick={logout} className="logout-btn">Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Desktop Auth/Profile */}
        {!mobileOpen && (
          <div className="navbar-right">
            {!isLoggedIn ? (
              <div className="auth-buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/signup')}>Signup</button>
              </div>
            ) : (
              <div className="profile-menu" onClick={toggleDropdown}>
                <div className="avatar">{username?.charAt(0).toUpperCase()}</div>
                {dropdownOpen && (
                  <div className="dropdown">
                    <p>Hello, {username}</p>
                    <Link to={`/profile/${username}`}>Profile</Link>
                    {role === 'user' && (
                      <>
                        <Link to="/applied-projects">Applied Projects</Link>
                        <Link to="/browse-projects">Browse Projects</Link>
                      </>
                    )}
                    {role === 'ngo' && (
                      <>
                        <Link to="/post-project">Post Project</Link>
                        <Link to="/posted-projects">Posted Projects</Link>
                         
                      </>
                    )}
                    <button onClick={logout} className="logout-btn">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;