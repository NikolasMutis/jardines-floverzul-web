import "./CardsSection.css";
import { useNavigate } from "react-router-dom";

function CardsSection() {

  const navigate = useNavigate();

  return (
    <section className="cards-section">

      <div className="card">
        <div className="card-icon">🌿</div>
        <h3>Plantas Nativas</h3>
        <p>
          Especies autóctonas adaptadas al clima local.
        </p>
        <button onClick={() => navigate("/catalogo")}>
          Ver más
        </button>
      </div>

      <div className="card">
        <div className="card-icon">🌸</div>
        <h3>Plantas Ornamentales</h3>
        <p>
          Hermosas plantas decorativas.
        </p>
        <button onClick={() => navigate("/catalogo")}>
          Ver más
        </button>
      </div>

      <div className="card">
        <div className="card-icon">🌳</div>
        <h3>Plantas Forestales</h3>
        <p>
          Árboles y arbustos para reforestación.
        </p>
        <button onClick={() => navigate("/catalogo")}>
          Ver más
        </button>
      </div>

    </section>
  );
}

export default CardsSection;