import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="paw-nav">
      {/* ── BAR ── */}
      <div className={`paw-nav__bar ${scrolled ? "paw-nav__bar--scrolled" : ""}`}>
        <div className="paw-nav__container">

          {/* LOGO */}
          <Link to="/" className="paw-nav__logo">
            <div className="paw-nav__logo-icon">🐶</div>
            <span className="paw-nav__logo-text">PawConnect</span>
          </Link>

          {/* RIGHT */}
          <div className="paw-nav__right">

            {/* Dogs link */}
            <Link
              to="/dogs"
              className={`paw-nav__link ${isActive("/dogs") ? "active" : ""}`}
            >
              <span>🐾</span>
              Dogs
              <span className="paw-nav__badge">New</span>
            </Link>

            {/* Add Dog button — always visible */}
            <Link
              to="/add-dog"
              className={`paw-nav__btn-add-dog ${isActive("/add-dog") ? "active" : ""}`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.8"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Dog
            </Link>

            <div className="paw-nav__divider" />

            {!token ? (
              <>
                <Link to="/login" className="paw-nav__btn-ghost">
                  Sign In
                </Link>
                <Link to="/signup" className="paw-nav__btn-primary">
                  Get Started →
                </Link>
              </>
            ) : (
              <button className="paw-nav__btn-logout" onClick={handleLogout}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            )}

            {/* Hamburger */}
            <button
              className={`paw-nav__hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="paw-nav__hamburger-line" />
              <span className="paw-nav__hamburger-line" />
              <span className="paw-nav__hamburger-line" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="paw-nav__mobile-menu">
          <Link
            to="/dogs"
            className={`paw-nav__mobile-link ${isActive("/dogs") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            🐾 Dogs
          </Link>

          {/* Add Dog in mobile menu */}
          <Link
            to="/add-dog"
            className={`paw-nav__mobile-link paw-nav__mobile-link--add ${isActive("/add-dog") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            ➕ Add Dog
          </Link>

          <div className="paw-nav__mobile-divider" />

          {!token ? (
            <>
              <Link
                to="/login"
                className={`paw-nav__mobile-link ${isActive("/login") ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="paw-nav__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Get Started →
              </Link>
            </>
          ) : (
            <button
              className="paw-nav__mobile-link"
              style={{ color: "rgba(220, 80, 20, 0.9)" }}
              onClick={() => { handleLogout(); setMenuOpen(false); }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}