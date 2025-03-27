import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions";
import "../Navbar.css"; // N'oubliez pas de créer ce fichier CSS

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">VABENE</span>
          </Link>
        </div>

        <div
          className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              <span className="item-icon">🏠</span>
              <span className="item-text">Accueil</span>
            </Link>
            <Link to="/add-listing" className="navbar-item">
              <span className="item-icon">➕</span>
              <span className="item-text">Ajouter une annonce</span>
            </Link>
          </div>

          <div className="navbar-end">
            {user ? (
              <>
                <Link to="/my-properties" className="navbar-item">
                  <span className="item-icon">➕</span>
                  <span className="item-text">Mes annonces</span>
                </Link>
                <div className="navbar-item user-profile">
                  <span className="item-icon">👤</span>
                  <span className="item-text">{user.name || user.email || "Profil"}</span>
                </div>
                <button className="navbar-item logout-button" onClick={handleLogout}>
                  <span className="item-icon">🚪</span>
                  <span className="item-text">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-item">
                  <span className="item-icon">🔑</span>
                  <span className="item-text">Connexion</span>
                </Link>
                <Link to="/register" className="navbar-item register-button">
                  <span className="item-icon">📝</span>
                  <span className="item-text">Inscription</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;