import "./InfoSection.css";

function InfoSection() {
  return (
    <section className="info-section">
      <div className="info-card">
        <div className="icon">🎯</div>
        <h2>Misión</h2>
        <p>
          Proveer plantas de alta calidad cultivadas de manera ecológica, 
          contribuyendo a la preservación del medio ambiente y al
           embellecimiento de espacios naturales y urbanos.
        </p>
      </div>

      <div className="info-card">
        <div className="icon">👁️</div>
        <h2>Visión</h2>
        <p>
          Ser el vivero ecológico líder en la región, 
          reconocido por la calidad de nuestras plantas, nuestro compromiso 
          ambiental y la satisfacción de nuevos clientes.
        </p>
      </div>

      <div className="info-card">
        <div className="icon">❤️</div>
        <h2>Valores</h2>
        <p>
          Sostenibilidad, calidad, respeto por la naturaleza, 
          innovación y compromiso con nuestros clientes y el medio ambiente.
        </p>
      </div>
    </section>
  );
}

export default InfoSection;