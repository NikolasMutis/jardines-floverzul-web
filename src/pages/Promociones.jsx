import Navbar from "../components/Navbar";
import "./Promociones.css";
import Cards from "../components/Cards";
import Ferias from "../components/Ferias";
import Eventos from "../components/Eventos";

function Promociones() {
  return (
    <>
      <Navbar />
      <section className="promociones-page">
        <div className="promociones-container">
          <h1 className="promociones-title">Promociones activas</h1>
          <p className="promociones-text">
            Aprovecha nuestras ofertas especiales y descuentos en plantas seleccionadas.
          </p>
        </div>
      </section>
      <Cards />
      <Ferias />
      <Eventos />
    </>
  );
}

export default Promociones;