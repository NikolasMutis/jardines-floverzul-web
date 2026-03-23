import Navbar from "../components/Navbar";
import "./Catalogo.css";
import { useState, useEffect } from "react";

import planta1 from "../assets/Planta7.jpg";
import planta2 from "../assets/Planta6.jpg";

function Catalogo() {

  /* ESTADO DEL MODAL */
  const [selectedPlant, setSelectedPlant] = useState(null);

  /* PLANTAS DEL DASHBOARD */
  const [extraPlants, setExtraPlants] = useState([]);

  useEffect(() => {
    const load = () => {
const stored = JSON.parse(localStorage.getItem("plants")) || [];
setExtraPlants(stored);
}

load()

window.addEventListener("storage", load)

return () => window.removeEventListener("storage", load)

}, []);

  /* PLANTAS BASE */
  const plantasBase = [
    {
      id: 1,
      nombre: "Orquídea Andina",
      cientifico: "Epidendrum secundum",
      categoria: "Orquídeas",
      descripcion: "Hermosa planta ornamental de flores rosadas.",
      precio: "$25.000",
      estado: "Disponible",
      imagen: planta1
    },
    {
      id: 2,
      nombre: "Helecho Verde",
      cientifico: "Nephrolepis exaltata",
      categoria: "Ornamentales",
      descripcion: "Ideal para interiores y ambientes húmedos.",
      precio: "$18.000",
      estado: "No disponible",
      imagen: planta2
    }
  ];

  /* UNIR TODO */
  const plantas = [...plantasBase, ...extraPlants];

  return (
    <>
      <Navbar />

      <section className="catalogo-page">

        {/* HEADER */}
        <div className="catalogo-header">
          <h1 className="catalogo-title">
            Catálogo Digital de Plantas
          </h1>

          <p className="catalogo-subtitle">
            Explora nuestra amplia selección de plantas nativas, ornamentales y forestales.
          </p>
        </div>

        {/* FILTROS */}
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
          <span>Mostrando {plantas.length} plantas</span>

          <button className="catalogo-pdf">
            Descargar catálogo en PDF
          </button>
        </div>

        {/* GRID */}
        <div className="plantas-grid">

          {plantas.map((planta, index) => (

            <div className="planta-card" key={index}>

              <img
                src={planta.imagen || planta.image}
                alt={planta.nombre || planta.name}
                className="planta-img"
              />

              <div className="planta-content">

                <div className="planta-header">

                  <div>
                    <h3>{planta.nombre || planta.name}</h3>
                    <p className="planta-cientifico">
                      {planta.cientifico || "N/A"}
                    </p>
                  </div>

                  <span className="planta-categoria">
                    {planta.categoria || "General"}
                  </span>

                </div>

                <p className="planta-desc">
                  {planta.descripcion || "Sin descripción"}
                </p>

                <div className="planta-footer">

                  <span className="planta-precio">
                    {planta.precio}
                  </span>

                  <span className={`planta-stock ${planta.estado === "Disponible" ? "ok" : "no"}`}>
                    {planta.estado || "Disponible"}
                  </span>

                </div>

                <button
                  className="planta-btn"
                  onClick={() => setSelectedPlant(planta)}
                >
                  Ver detalles
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* MODAL */}
      {selectedPlant && (

        <div className="modal-overlay">

          <div className="modal-detalle">

            <button
              className="close-modal"
              onClick={() => setSelectedPlant(null)}
            >
              ✕
            </button>

            <h2>{selectedPlant.nombre || selectedPlant.name}</h2>

            <img
              src={selectedPlant.imagen || selectedPlant.image}
              alt="planta"
            />

            <div className="detalle-grid">

              {/* INFO GENERAL */}
              <div>
                <h3>Información General</h3>
                <ul>
                  <li><strong>Tipo:</strong> {selectedPlant.categoria || "Ornamental"}</li>
                  <li><strong>Cantidad disponible:</strong> 67 unidades</li>
                  <li><strong>Origen:</strong> Asia</li>
                  <li><strong>Hábitat:</strong> Ambiente húmedo, suelo ácido</li>
                </ul>
              </div>

              {/* CARACTERÍSTICAS */}
              <div>
                <h3>Características Específicas</h3>
                <ul>
                  <li><strong>Forma:</strong> Larga floración</li>
                  <li><strong>Tamaño:</strong> 40 cm</li>
                  <li><strong>Color hojas:</strong> Verde amarillento</li>
                  <li><strong>Color flores:</strong> Blancas, lilas</li>
                  <li><strong>Época:</strong> Primavera - Verano</li>
                </ul>
              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default Catalogo;