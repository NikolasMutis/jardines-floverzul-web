import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PQRS from "./pages/PQRS";
import Promociones from "./pages/Promociones";
import Catalogo from "./pages/Catalogo";
import Contactanos from "./pages/Contactanos";
import WhatsAppButton from "./components/WhatsAppButton";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pqrs" element={<PQRS />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contacto" element={<Contactanos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;