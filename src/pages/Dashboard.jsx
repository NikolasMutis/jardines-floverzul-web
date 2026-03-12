import "./Dashboard.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import {
  getAllPQRS,
  updatePQRSStatus,
  deletePQRS,
} from "../services/pqrsService";

function Dashboard() {
  /* ESTADOS */

  const [tab, setTab] = useState("plantas");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [cientifico, setCientifico] = useState("");
  const [image, setImage] = useState(null);

  const [plants, setPlants] = useState(
    () => JSON.parse(localStorage.getItem("plants")) || []
  );

  const [pqrs, setPqrs] = useState([]);
  const [cargandoPQRS, setCargandoPQRS] = useState(false);
  const [errorPQRS, setErrorPQRS] = useState("");

  /* CARGAR PQRS CUANDO SE ABRE LA PESTAÑA */
  useEffect(() => {
    if (tab !== "pqrs") return;

    const cargar = async () => {
      setCargandoPQRS(true);
      setErrorPQRS("");
      const { data, error } = await getAllPQRS();
      if (error) {
        setErrorPQRS("No se pudieron cargar las PQRS.");
      }
      setPqrs(data || []);
      setCargandoPQRS(false);
    };

    cargar();
  }, [tab]);

  const refrescarPQRS = async () => {
    setCargandoPQRS(true);
    setErrorPQRS("");
    const { data, error } = await getAllPQRS();
    if (error) {
      setErrorPQRS("No se pudieron cargar las PQRS.");
    }
    setPqrs(data || []);
    setCargandoPQRS(false);
  };

  /* AGREGAR PLANTA */

  const addPlant = () => {
    if (name === "" || price === "") {
      alert("Completa los campos");
      return;
    }

    const imageURL = image ? URL.createObjectURL(image) : null;

    const newPlant = {
      name,
      price,
      descripcion: desc,
      cientifico: cientifico,
      image: imageURL,
    };

    const updatedPlants = [...plants, newPlant];

    setPlants(updatedPlants);

    localStorage.setItem("plants", JSON.stringify(updatedPlants));

    setName("");
    setPrice("");
    setDesc("");
    setCientifico("");
    setImage(null);
  };

  /* ELIMINAR PLANTA */

  const deletePlant = (index) => {
    const updatedPlants = [...plants];

    updatedPlants.splice(index, 1);

    setPlants(updatedPlants);

    localStorage.setItem("plants", JSON.stringify(updatedPlants));
  };

  const cambiarEstadoPQRS = async (id, nuevoEstado) => {
    const { error } = await updatePQRSStatus(id, nuevoEstado);
    if (!error) {
      setPqrs((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, estado: nuevoEstado } : item,
        ),
      );
    }
  };

  const eliminarPQRS = async (id) => {
    const { error } = await deletePQRS(id);
    if (!error) {
      setPqrs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  /* RENDER */

  return (
    <>
      <Navbar />

      <section className="dashboard">
        <h1 className="dash-title">Panel Administrativo</h1>

        <p className="dash-subtitle">Gestión completa del sistema</p>

        {/* TARJETAS */}

        <div className="dash-cards">
          <div className="dash-card">
            <h3>Plantas registradas</h3>
            <p>{plants.length}</p>
          </div>

          <div className="dash-card">
            <h3>Promociones activas</h3>
            <p>3</p>
          </div>

          <div className="dash-card">
            <h3>PQRS recibidos</h3>
            <p>{pqrs.length}</p>
          </div>

          <div className="dash-card">
            <h3>Usuarios registrados</h3>
            <p>5</p>
          </div>
        </div>

        {/* BARRA DE PESTAÑAS */}

        <div className="dash-tabs">
          <button onClick={() => setTab("plantas")}>Plantas</button>

          <button onClick={() => setTab("promociones")}>Promociones</button>

          <button onClick={() => setTab("pqrs")}>PQRS</button>

          <button onClick={() => setTab("usuarios")}>Usuarios</button>
        </div>

        {/* SECCIÓN DINÁMICA */}

        <div className="dash-content">
          {/* PLANTAS */}

          {tab === "plantas" && (
            <>
              <div className="plant-form">
                <h2>Agregar planta</h2>

                <input
                  placeholder="Nombre de la planta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Nombre científico"
                  value={cientifico}
                  onChange={(e) => setCientifico(e.target.value)}
                />

                <input
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <textarea
                  placeholder="Descripción"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />

                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <button onClick={addPlant}>Guardar planta</button>
              </div>

              <h2 className="plant-list-title">Plantas registradas</h2>

              <div className="plant-list">
                {plants.map((plant, index) => (
                  <div className="plant-item" key={index}>
                    {plant.image && (
                      <img src={plant.image} alt={plant.name} />
                    )}

                    <div className="plant-info">
                      <h4>{plant.name}</h4>

                      <p>{plant.cientifico}</p>

                      <p>${plant.price}</p>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => deletePlant(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PROMOCIONES */}

          {tab === "promociones" && (
            <div>
              <h2>Gestión de promociones</h2>

              <p>Aquí podrás crear o editar promociones.</p>
            </div>
          )}

          {/* PQRS */}

          {tab === "pqrs" && (
            <div>
              <div className="pqrs-header">
                <h2>PQRS recibidos</h2>
                <button onClick={refrescarPQRS}>Actualizar</button>
              </div>

              {cargandoPQRS && <p>Cargando PQRS...</p>}
              {errorPQRS && <p className="error-text">{errorPQRS}</p>}

              {!cargandoPQRS && !errorPQRS && pqrs.length === 0 && (
                <p>No hay PQRS registradas.</p>
              )}

              {!cargandoPQRS && pqrs.length > 0 && (
                <table className="pqrs-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Asunto</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th>Creado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pqrs.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre || "-"}</td>
                        <td>{item.tipo}</td>
                        <td>{item.asunto}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.estado}</td>
                        <td>
                          {item.created_at
                            ? new Date(item.created_at).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              cambiarEstadoPQRS(
                                item.id,
                                item.estado === "pendiente"
                                  ? "en_proceso"
                                  : "cerrada",
                              )
                            }
                          >
                            Cambiar estado
                          </button>
                          <button onClick={() => eliminarPQRS(item.id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* USUARIOS */}

          {tab === "usuarios" && (
            <div>
              <h2>Usuarios registrados</h2>

              <p>
                Aquí podrás ver los usuarios que han ingresado a la plataforma.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;