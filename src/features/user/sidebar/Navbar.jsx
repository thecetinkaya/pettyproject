import React from "react";
import { Link } from "react-scroll"; // react-scroll importu
import { Link as RouterLink } from "react-router-dom"; // react-router-dom'dan Link importu
import "../../../styles/Navbar.css"; // CSS dosyasını içe aktardık

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" className="brand">
            PETTY
          </a>
        </div>

        <div className="navbar-links">
          {/* react-scroll ile kaydırma yapılacak linkler */}
          <Link
            to="home" // Hedef id: home
            smooth={true}
            duration={500}
            className="nav-link"
          >
            Anasayfa
          </Link>
          <Link
            to="services" // Hedef id: services
            smooth={true}
            duration={500}
            className="nav-link"
          >
            Hizmetler
          </Link>
          <Link
            to="sss" // Hedef id: sss
            smooth={true}
            duration={500}
            className="nav-link"
          >
            SSS
          </Link>

          {/* react-router-dom Link ile yönlendirme yapılacak butonlar */}
          <RouterLink
            to="/login" // "/login" sayfasına yönlendiriyor
            className="btn btn-primary"
          >
            Giriş Yap
          </RouterLink>
          <RouterLink
            to="/register" // "/register" sayfasına yönlendiriyor
            className="btn btn-secondary"
          >
            Kayıt Ol
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
