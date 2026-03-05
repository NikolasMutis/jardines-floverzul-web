import "./Cards.css";
import img1 from "../assets/planta3.jpg";
import img2 from "../assets/planta4.jpg";
import img3 from "../assets/planta5.jpg";

function Cards() {
  const productos = [
    {
      id: 1,
      nombre: "Producto 1",
      imagen: img1,
      estado: "Activa",
      descuento: "-20%",
      descripcion: "¡20% de descuento en toda nuestra colección de plantas ornamentales!Aprovecha esta oferta especial para embellecer tu hogar o jardín"
    },
    {
      id: 2,
      nombre: "Producto 2",
      imagen: img2,
      estado: "Desactivada",
      descuento: "-10%",
      descripcion: "Lleva 3 suculentas y paga solo 2. Perfectas para pequeños espacios y fáciles de cuidad."
    },
    {
      id: 3,
      nombre: "Producto 3",
      imagen: img3,
      estado: "Activa",
      descuento: "-30%",
      descripcion: "15% de descuento en todos los helechos. Ideales para interiores y exteriores con sombra"
    }
  ];

  return (
    <section className="tarjetas-page">
      <div className="tarjetas-container">
        {productos.map((prod) => (
          <div className="tarjeta" key={prod.id}>
            <div className="tarjeta-header">
              <span className={`estado-btn ${prod.estado === "Activa" ? "active" : "inactive"}`}>
                {prod.estado}
              </span>
              <span className="descuento-btn">{prod.descuento}</span>
            </div>
            <img src={prod.imagen} alt={prod.nombre} className="tarjeta-img" />
            <p className="tarjeta-text">{prod.descripcion}</p>
            <button className="tarjeta-btn">Aprovecha oferta</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cards;