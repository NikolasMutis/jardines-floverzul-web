import "./CardsSection.css";

function CardsSection() {
  return (
    <section className="cards-section">

      <div className="card">
        <div className="card-icon">🌿</div>
        <h3>Plantas Nativas</h3>
        <p>
          Especies auctóctonas adaptadas al clima local, ideales 
          para la conversación de la biodiversidad regional.
        </p>
        <button>Ver más</button>
      </div>

      <div className="card">
        <div className="card-icon">🌸</div>
        <h3>Plantas Ornamentales</h3>
        <p>
          Hermosas plantas decorativas para embellecer jardínes, interiores y espacios exteriores.
        </p>
        <button>Ver más</button>
      </div>

      <div className="card">
        <div className="card-icon">🌳</div>
        <h3>Plantas Forestales</h3>
        <p>
          Árboles y arbustos para reforestación, recuperación de ecosistemas y proyectos ambientales. 
        </p>
        <button>Ver más</button>
      </div>

    </section>
  );
}

export default CardsSection;