import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions";
import { Menu, X, Home, PlusCircle, User, LogOut, LogIn, UserPlus } from "lucide-react";
import "../Navbar.css"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <Home className="logo-icon" size={28} />
            <span className="logo-text">VABENE</span>
          </Link>
        </div>

        {/* Bouton burger animé */}
        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </div>

        {/* Menu de navigation */}
        <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              <Home className="item-icon" size={20} />
              <span className="item-text">Accueil</span>
            </Link>
            <Link to="/add-listing" className="navbar-item">
              <PlusCircle className="item-icon" size={20} />
              <span className="item-text">Ajouter une annonce</span>
            </Link>
          </div>

          <div className="navbar-end">
            {user ? (
              <>
                <Link to="/my-properties" className="navbar-item">
                  <PlusCircle className="item-icon" size={20} />
                  <span className="item-text">Mes annonces</span>
                </Link>
                <div className="navbar-item user-profile">
                  <User className="item-icon" size={20} />
                  <span className="item-text">{user.name || user.email || "Profil"}</span>
                </div>
                <button className="navbar-item logout-button" onClick={handleLogout}>
                  <LogOut className="item-icon" size={20} />
                  <span className="item-text">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-item">
                  <LogIn className="item-icon" size={20} />
                  <span className="item-text">Connexion</span>
                </Link>
                <Link to="/register" className="navbar-item register-button">
                  <UserPlus className="item-icon" size={20} />
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
