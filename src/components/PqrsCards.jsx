import "./PqrsCards.css";

function PqrsCards() {
  return (
    <section className="pqrs-cards-section">
      <div className="cards-container">

        <div className="pqrs-card">
          <div className="card-icon">📩</div>
          <h3>Peticiones</h3>
          <p>
            Solicitudes de información o servicios
          </p>
        </div>

        <div className="pqrs-card">
          <div className="card-icon">⚠️</div>
          <h3>Quejas / Reclamos</h3>
          <p>
            Reporta situaciones que requieran atención.
          </p>
        </div>

        <div className="pqrs-card">
          <div className="card-icon">💡</div>
          <h3>Sugerencias</h3>
          <p>
            Comparte ideas para mejorar nuestro servicio.
          </p>
        </div>

      </div>
    </section>
  );
}

export default PqrsCards;