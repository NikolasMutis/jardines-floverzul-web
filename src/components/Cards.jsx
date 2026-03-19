import "./Cards.css";
import { useState, useEffect } from "react";

import img1 from "../assets/planta3.jpg";
import img2 from "../assets/planta4.jpg";
import img3 from "../assets/planta5.jpg";

function Cards() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {

    const storedPromos = JSON.parse(localStorage.getItem("promos")) || [];

    const productosBase = [
      {
        id: 1,
        nombre: "Producto 1",
        imagen: img1,
        estado: "Activa",
        descuento: "-20%",
        descripcion: "¡20% de descuento en toda nuestra colección de plantas ornamentales!"
      },
      {
        id: 2,
        nombre: "Producto 2",
        imagen: img2,
        estado: "Desactivada",
        descuento: "-10%",
        descripcion: "Lleva 3 suculentas y paga solo 2."
      },
      {
        id: 3,
        nombre: "Producto 3",
        imagen: img3,
        estado: "Activa",
        descuento: "-30%",
        descripcion: "15% de descuento en todos los helechos."
      }
    ];

    /* 🔥 CONVERTIR PROMOS DEL ADMIN A CARDS */
    const promosAdaptadas = storedPromos.map((p, i) => ({
      id: i + 100,
      nombre: p.title,
      imagen: img1,
      estado: p.status,
      descuento: "-20%", // luego lo haces dinámico
      descripcion: p.desc
    }));

    /* 🔥 SOLO UNA LISTA (SIN DUPLICAR) */
    setProductos([...productosBase, ...promosAdaptadas]);

  }, []);

  return (
    <section className="tarjetas-page">

      <div className="tarjetas-container">

        {productos.map((prod) => (

          <div className="tarjeta" key={prod.id}>

            <div className="tarjeta-header">

              <span className={`estado-btn ${prod.estado === "Activa" ? "active" : "inactive"}`}>
                {prod.estado}
              </span>

              <span className="descuento-btn">
                {prod.descuento}
              </span>

            </div>

            <img
              src={prod.imagen}
              alt={prod.nombre}
              className="tarjeta-img"
            />

            <p className="tarjeta-text">
              {prod.descripcion}
            </p>

            <button className="tarjeta-btn">
              Aprovecha oferta
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Cards;