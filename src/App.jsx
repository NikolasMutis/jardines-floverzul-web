import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import PQRS from "./pages/PQRS";
import Promociones from "./pages/Promociones";
import Catalogo from "./pages/Catalogo";
import Contactanos from "./pages/Contactanos";
import WhatsAppButton from "./components/WhatsAppButton";
import Dashboard from "./pages/Dashboard";

function App() {
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("user"))?.role || null
  );

  useEffect(() => {
    const syncUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setRole(user?.role || null);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pqrs" element={<PQRS />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contacto" element={<Contactanos />} />
        <Route path="/dashboard" element={<Dashboard role={role} />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;