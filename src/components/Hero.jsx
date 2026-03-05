import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <h1>Naturaleza, Vida y Belleza en cada hoja</h1>
        <p>
          Bienvenido a Jardines Floverzul, tu vivero ecólogico especializado 
          en plantas nativas, ornamentales y forestales de la más alta calidad. 
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">🍃 Ver catálogo</button>
          <button className="btn-secondary">Contáctanos</button>
          <button className="btn-secondary">Enviar PQRS</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;