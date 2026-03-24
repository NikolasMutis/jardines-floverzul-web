import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./PQRS.css";
import PqrsCards from "../components/PqrsCards";
import PqrsForm from "../components/PqrsForm";
import { getAllPQRS } from "../services/pqrsService";

function PQRS() {

  const [tipoSolicitud, setTipoSolicitud] = useState("peticion");

  useEffect(() => {

    const cargarPQRS = async () => {

      const { data, error } = await getAllPQRS();

      console.log("DATOS PQRS:", data);
      console.log("ERROR:", error);

    };

    cargarPQRS();

  }, []);

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
            Tu opinión es importante para nosotros. Utiliza este formulario
            para enviarnos tus comentarios, sugerencias o reportar cualquier
            situación.
          </p>

        </div>
      </section>

      <section className="pqrs-layout">

        <div className="pqrs-form-area">
          <PqrsForm tipo={tipoSolicitud} />
        </div>

        <div className="pqrs-cards-area">
          <PqrsCards
            tipoSolicitud={tipoSolicitud}
            setTipoSolicitud={setTipoSolicitud}
          />
        </div>

      </section>

      

    </>
  );
}

export default PQRS;