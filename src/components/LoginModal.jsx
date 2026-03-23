import { useState, useEffect } from "react";
import "./LoginModal.css";
import { login } from "../services/authService";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const syncUserList = (authUser) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const nextUser = {
        email: authUser.user.email,
        name: authUser.user.user_metadata?.name || authUser.user.email,
        rol: authUser.role || "empleado",
        estado: "activo"
      };
      const userIndex = users.findIndex((user) => user.email === nextUser.email);

      if (userIndex >= 0) {
        users[userIndex] = { ...users[userIndex], ...nextUser };
      } else {
        users.push(nextUser);
      }

      localStorage.setItem("users", JSON.stringify(users));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error syncing local users list:", error);
    }
  };

  const handleLogin = async () => {
    const authUser = await login(email, password);

    if (authUser) {
      syncUserList(authUser);
      setNotif(`Bienvenido ${authUser.role === "admin" ? "Administrador" : "Empleado"}`);
      onLogin(authUser.role);
      onClose();
      setTimeout(() => setNotif(null), 3000);
      return;
    }

    alert("Credenciales incorrectas");
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-modal">
          <button className="close-btn" onClick={onClose}>×</button>
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
