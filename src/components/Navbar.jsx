import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
            <span className="logo-icon">🌿</span>
            <div>
                <h3>Jardines Floverzul</h3>
                <p>Vivero Ecológico</p>
            </div>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><a href="#Catalogo">Catálogo</a></li>
          <li><Link to="/Promociones">Promociones</Link></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><Link to="/pqrs">PQRS</Link></li>
        </ul>

        <button 
          className="login-btn"
          onClick={() => setShowLogin(true)}
        >
          Iniciar sesión
        </button>
      </nav>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Iniciar sesión</h2>
            <input type="email" placeholder="Correo" />
            <input type="password" placeholder="Contraseña" />
            <button>Entrar</button>
            <span onClick={() => setShowLogin(false)}>Cerrar</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;