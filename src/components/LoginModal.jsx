import { useState, useEffect } from "react";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      const defaultUsers = [
        { email: "admin@floverzul.com", password: "admin123", role: "admin" },
        { email: "empleado@floverzul.com", password: "emp123", role: "empleado" }
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);

  if (!isOpen) return null;

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      localStorage.setItem("user", JSON.stringify({ email: found.email, role: found.role }));
      setNotif(`Bienvenido ${found.role === "admin" ? "Administrador" : "Empleado"}`);
      onLogin(found.role);
      setTimeout(() => setNotif(null), 3000);
      return;
    }

    alert("Credenciales incorrectas");
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-modal">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2 className="login-title">Iniciar sesión</h2>

          <input type="email" placeholder="tu@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type={showPassword ? "text" : "password"} placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Mostrar contraseña
          </label>

          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      </div>

      {notif && (
        <div className="login-notification">
          {notif}
        </div>
      )}
    </>
  );
}

export default LoginModal;