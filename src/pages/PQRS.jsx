import Navbar from "../components/Navbar";
import "./PQRS.css";
import PqrsCards from "../components/PqrsCards";
import PqrsForm from "../components/PqrsForm";

function PQRS() {
  return (
    <>
      <Navbar />
      <section className="pqrs-page">
        <div className="pqrs-container">
          <h1 className="pqrs-title">PQRS</h1>
          <h3 className="pqrs-subtitle">
            Peticiones, Quejas, Reclamos y Sugerencias
          </h3>
          <p className="pqrs-text">
            Tu opinión es importante para nosotros. Utiliza este formulario para enviarnos tus comentarios,
            sugerencias o reportar cualquier situación.
          </p>
        </div>
      </section>
      <PqrsCards />
      <PqrsForm />
    </>
  );
}

export default PQRS;