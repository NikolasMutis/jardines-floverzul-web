import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PQRS from "./pages/PQRS";
import Promociones from "./pages/Promociones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pqrs" element={<PQRS />} />
        <Route path="/promociones" element={<Promociones />} />
      </Routes>
    </Router>
  );
}

export default App;