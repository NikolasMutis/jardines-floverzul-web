import Navbar from "../components/Navbar";
import "./Catalogo.css";

import { useEffect, useState } from "react";

import planta1 from "../assets/Planta7.jpg";
import planta2 from "../assets/Planta6.jpg";

function Catalogo() {

  /* PLANTAS FIJAS */

  const plantas = [
    {
      id: 1,
      nombre: "Orquídea Andina",
      cientifico: "Epidendrum secundum",
      categoria: "Orquídeas",
      descripcion: "Hermosa planta ornamental de flores rosadas muy usada en jardines.",
      precio: "$25.000",
      estado: "Disponible",
      imagen: planta1
    },
    {
      id: 2,
      nombre: "Helecho Verde",
      cientifico: "Nephrolepis exaltata",
      categoria: "Ornamentales",
      descripcion: "Planta decorativa ideal para interiores y ambientes húmedos.",
      precio: "$18.000",
      estado: "No disponible",
      imagen: planta2
    }
  ];

  /* PLANTAS AGREGADAS DESDE DASHBOARD */

  const [plantasDashboard, setPlantasDashboard] = useState([]);

  useEffect(() => {

    const storedPlants = JSON.parse(localStorage.getItem("plants")) || [];

    setPlantasDashboard(storedPlants);

  }, []);

  /* COMBINAR LAS DOS LISTAS */

  const todasLasPlantas = [...plantas, ...plantasDashboard];

  return (
    <>
      <Navbar />

      <section className="catalogo-page">

        {/* TITULO */}

        <div className="catalogo-header">

          <h1 className="catalogo-title">
            Catálogo Digital de Plantas
          </h1>

          <p className="catalogo-subtitle">
            Explora nuestra amplia selección de plantas nativas, ornamentales y forestales.
            Todas cultivadas con prácticas ecológicas y sostenibles.
          </p>

        </div>


        {/* BARRAS DE BUSQUEDA */}

        <div className="catalogo-filtros">

          <input
            type="text"
            placeholder="Busca por nombre o nombre científico..."
            className="catalogo-search"
          />

          <select className="catalogo-filter">
            <option>Todas las plantas</option>
            <option>Orquídeas</option>
            <option>Ornamentales</option>
            <option>Forestales</option>
          </select>

        </div>


        {/* INFO */}

        <div className="catalogo-info">

          <span>
            Mostrando {todasLasPlantas.length} de {todasLasPlantas.length} plantas
          </span>

          <button className="catalogo-pdf">
            Descargar catálogo en PDF
          </button>

        </div>


        {/* TARJETAS */}

        <div className="plantas-grid">

          {todasLasPlantas.map((planta, index) => (

            <div className="planta-card" key={index}>

              {planta.imagen && (
                <img
                  src={planta.imagen}
                  alt={planta.nombre}
                  className="planta-img"
                />
              )}

              {planta.image && (
                <img
                  src={planta.image}
                  alt={planta.name}
                  className="planta-img"
                />
              )}

              <div className="planta-content">

                <div className="planta-header">

                  <div>

                    <h3>{planta.nombre || planta.name}</h3>

                    {(planta.cientifico) && (
                      <p className="planta-cientifico">
                        {planta.cientifico}
                      </p>
                    )}

                  </div>

                  {(planta.categoria) && (
                    <span className="planta-categoria">
                      {planta.categoria}
                    </span>
                  )}

                </div>


                {(planta.descripcion) && (
                  <p className="planta-desc">
                    {planta.descripcion}
                  </p>
                )}


                <div className="planta-footer">

                  <span className="planta-precio">
                    {planta.precio || `$${planta.price}`}
                  </span>

                  {(planta.estado) && (
                    <span className={`planta-stock ${planta.estado === "Disponible" ? "ok" : "no"}`}>
                      {planta.estado}
                    </span>
                  )}

                </div>


                <button className="planta-btn">
                  Ver detalles
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>
    </>
  );
}

export default Catalogo;

