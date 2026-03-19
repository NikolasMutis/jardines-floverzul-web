import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import LoginModal from "./LoginModal";
import logoImg from "../assets/logo.jpg";
import "./Navbar.css";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("user")) !== null
  );

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImg} className="navbar-logo" alt="Logo Jardines Floverzul" />
        <div>
          <h3>Jardines Floverzul</h3>
          <p>Vivero Ecológico</p>
        </div>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/catalogo">Catálogo</Link></li>
        <li><Link to="/promociones">Promociones</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/pqrs">PQRS</Link></li>
        {logged && <li><Link to="/dashboard">Dashboard</Link></li>}
      </ul>

      {!logged && (
        <button className="login-btn" onClick={() => setShowLogin(true)}>
          Iniciar sesión
        </button>
      )}

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(role) => {
          setLogged(true);
          navigate("/dashboard");
        }}
      />
    </nav>
  );
}

export default Navbar;