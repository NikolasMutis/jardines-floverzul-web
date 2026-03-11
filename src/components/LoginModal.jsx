import { useState } from "react";
import "./LoginModal.css";
import img2 from "../assets/logo.jpg";

function LoginModal({ isOpen, onClose, onLogin }) {

const [showPassword, setShowPassword] = useState(false);

if (!isOpen) return null;

return (

<div className="login-overlay">

<div className="login-modal">

<button
className="close-login"
onClick={onClose}
>
✕
</button>

<img
src={img2}
className="login-logo"
/>

<h2 className="login-title">Iniciar sesión</h2>

<p className="login-subtitle">
Accede a tu cuenta de Jardines Floverzul
</p>

<label>Correo electrónico</label>

<input
type="email"
placeholder="tu@gmail.com"
/>

<label>Contraseña</label>

<input
type={showPassword ? "text" : "password"}
placeholder="********"
/>

<div className="show-password">

<input
type="checkbox"
onChange={() => setShowPassword(!showPassword)}
/>

<span>Mostrar contraseña</span>

</div>

<button
className="login-btn"
onClick={onLogin}
>
Iniciar sesión
</button>

<button
className="cancel-login"
onClick={onClose}
>
Cancelar
</button>

<p className="forgot-password">
¿Olvidó su contraseña?
</p>

</div>

</div>

);

}

export default LoginModal;