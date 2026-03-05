import "./Eventos.css";

import imgEvento1 from "../assets/Planta1.jpg";
import imgEvento2 from "../assets/Planta6.jpg";

function Eventos() {
  const eventos = [
    {
      id: 1,
      titulo: "Feria de Plantas Nativas",
      contenido: "Gran feria dedicada a las plantas nativas de nuestra región. Talleres gratuitos, sobre cultivo y conservación",
      fecha: "Viernes, 14 de noviembre de 2026",
      ubicacion: "Vivero Floverzu - Sede Principal",
      imagen: imgEvento1
    },
    {
      id: 2,
      titulo: "Feria de Plantas",
      contenido: "Descubre nuevas especies y comparte con la comunidad amante de las plantas.",
      fecha: "12 Marzo 2026",
      ubicacion: "Plaza Principal, Ciudad",
      imagen: imgEvento2
    }
  ];

  return (
    <section className="eventos-page">
      <div className="eventos-container">
        {eventos.map((evento) => (
          <div className="evento-card" key={evento.id}>
            {/* Texto a la izquierda */}
            <div className="evento-text">
              <h3 className="evento-title">{evento.titulo}</h3>
              <p className="evento-content">{evento.contenido}</p>
              <div className="evento-info">
                <span className="evento-fecha">📅 {evento.fecha}</span>
                <span className="evento-ubicacion">📍 {evento.ubicacion}</span>
              </div>
              <button className="evento-btn">Más información</button>
            </div>

            {/* Imagen a la derecha */}
            <div className="evento-img-container">
              <img src={evento.imagen} alt={evento.titulo} className="evento-img" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Eventos;