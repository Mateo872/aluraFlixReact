import React from "react";
import logo from "../img/logoAlura.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="Menu">
        <Link to="/" className="LogoLink">
          <img src={logo} alt="AluraFlix logo" className="Logo" />
        </Link>
        <Link to="/nuevo-video" className="buttonLink">
          Nuevo video
        </Link>
      </nav>
    </header>
  );
}

export default Header;
