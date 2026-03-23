import "./PqrsCards.css";

function PqrsCards({ tipoSolicitud, setTipoSolicitud }) {
  return (
    <div className="cards-container">

      <div
        className={`pqrs-card ${tipoSolicitud === "peticion" ? "active" : ""}`}
        onClick={() => setTipoSolicitud("peticion")}
      >
        <h3>📄 Petición</h3>
        <p>Solicita información o realiza una petición formal.</p>
      </div>

      <div
        className={`pqrs-card ${tipoSolicitud === "queja" ? "active" : ""}`}
        onClick={() => setTipoSolicitud("queja")}
      >
        <h3>⚠️ Queja / Reclamo</h3>
        <p>Reporta una inconformidad con nuestros servicios.</p>
      </div>

      <div
        className={`pqrs-card ${tipoSolicitud === "sugerencia" ? "active" : ""}`}
        onClick={() => setTipoSolicitud("sugerencia")}
      >
        <h3>💡 Sugerencia</h3>
        <p>Ayúdanos a mejorar con tus ideas.</p>
      </div>

    </div>
  );
}

export default PqrsCards;