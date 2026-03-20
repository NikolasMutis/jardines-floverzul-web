import "./Cards.css";
import { useState, useEffect } from "react";
import { getPromociones } from "../services/promocionesService";

import img1 from "../assets/Planta3.jpg";
import img2 from "../assets/Planta4.jpg";
import img3 from "../assets/Planta5.jpg";

function Cards() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {

    const loadPromociones = async () => {
      const promociones = await getPromociones();

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

      const promosAdaptadas = promociones.map((promo, index) => ({
        id: promo.id || index + 100,
        nombre: promo.title,
        imagen: img1,
        estado: promo.status,
        descuento: promo.descuento,
        descripcion: promo.desc
      }));

      setProductos([...productosBase, ...promosAdaptadas]);
    };

    loadPromociones();

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
