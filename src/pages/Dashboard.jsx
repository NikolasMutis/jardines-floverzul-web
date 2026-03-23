import "./Dashboard.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout as logoutService } from "../services/authService";
import { getPlantas, createPlanta, deletePlanta as deletePlantaService } from "../services/PlantasService";
import { getPromociones, createPromocion, updatePromocion, deletePromocion as deletePromocionService } from "../services/promocionesService";
import { getPqrs, updatePqrsStatus, deletePqrs as deletePqrsService } from "../services/pqrsService";

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return [];
  }
};

const saveStoredUsers = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Error saving users in localStorage:", error);
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const isAdmin = user?.role === "admin";

  const [tab, setTab] = useState("plantas");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [cientifico, setCientifico] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [image, setImage] = useState(null);

  const [plants, setPlants] = useState([]);
  const [promos, setPromos] = useState([]);
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [promoTitle, setPromoTitle] = useState("");
  const [promoDesc, setPromoDesc] = useState("");
  const [promoDate, setPromoDate] = useState("");
  const [promoStatus, setPromoStatus] = useState("Activa");
  const [editIndex, setEditIndex] = useState(null);

  const [pqrs, setPqrs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      const [plantasData, promocionesData, pqrsData] = await Promise.all([
        getPlantas(),
        getPromociones(),
        getPqrs()
      ]);

      if (!isMounted) {
        return;
      }

      setPlants(plantasData);
      setPromos(promocionesData);
      setPqrs(pqrsData);
    };

    setUser(getCurrentUser());
    setUsers(getStoredUsers());
    loadDashboardData();

    const sync = () => {
      setUser(getCurrentUser());
      setUsers(getStoredUsers());
    };

    window.addEventListener("storage", sync);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", sync);
    };
  }, []);

  const logout = async () => {
    await logoutService();
    setUser(null);
    navigate("/");
  };

  const addPlant = async () => {
    if (name === "" || price === "" || tipo === "") {
      alert("Completa los campos");
      return;
    }

    const newPlant = await createPlanta({
      nombre: name,
      precio: price,
      descripcion: desc,
      cientifico,
      tipo,
      estado,
      imagenFile: image
    });

    if (!newPlant) {
      alert("No fue posible guardar la planta");
      return;
    }

    setPlants((currentPlants) => [newPlant, ...currentPlants]);
    setName("");
    setPrice("");
    setDesc("");
    setCientifico("");
    setTipo("");
    setEstado("Disponible");
    setImage(null);
    setShowForm(false);
  };

  const deletePlant = async (index) => {
    const plantToDelete = plants[index];

    if (!plantToDelete?.id) {
      return;
    }

    const deleted = await deletePlantaService(plantToDelete.id);

    if (deleted) {
      setPlants((currentPlants) => currentPlants.filter((_, currentIndex) => currentIndex !== index));
    }
  };

  const addPromo = async () => {
    if (promoTitle === "" || promoDesc === "") {
      alert("Completa los campos");
      return;
    }

    if (editIndex !== null) {
      const promoToUpdate = promos[editIndex];
      const updatedPromo = await updatePromocion(promoToUpdate.id, {
        title: promoTitle,
        desc: promoDesc,
        date: promoDate,
        status: promoStatus
      });

      if (!updatedPromo) {
        alert("No fue posible actualizar la promocion");
        return;
      }

      setPromos((currentPromos) => currentPromos.map((promo, index) => (
        index === editIndex ? updatedPromo : promo
      )));
      setEditIndex(null);
    } else {
      const newPromo = await createPromocion({
        title: promoTitle,
        desc: promoDesc,
        date: promoDate,
        status: promoStatus
      });

      if (!newPromo) {
        alert("No fue posible guardar la promocion");
        return;
      }

      setPromos((currentPromos) => [newPromo, ...currentPromos]);
    }

    setPromoTitle("");
    setPromoDesc("");
    setPromoDate("");
    setPromoStatus("Activa");
    setShowPromoForm(false);
  };

  const deletePromo = async (index) => {
    const promoToDelete = promos[index];

    if (!promoToDelete?.id) {
      return;
    }

    const deleted = await deletePromocionService(promoToDelete.id);

    if (deleted) {
      setPromos((currentPromos) => currentPromos.filter((_, currentIndex) => currentIndex !== index));
    }
  };

  const editPromo = (index) => {
    const promo = promos[index];
    setPromoTitle(promo.title);
    setPromoDesc(promo.desc);
    setPromoDate(promo.date);
    setPromoStatus(promo.status);
    setEditIndex(index);
    setShowPromoForm(true);
  };

  const changeStatus = async (index, estadoNuevo) => {
    const pqrsToUpdate = pqrs[index];

    if (!pqrsToUpdate?.id) {
      return;
    }

    const updatedPqrs = await updatePqrsStatus(pqrsToUpdate.id, estadoNuevo);

    if (updatedPqrs) {
      setPqrs((currentPqrs) => currentPqrs.map((item, currentIndex) => (
        currentIndex === index ? updatedPqrs : item
      )));
    }
  };

  const deletePqrs = async (index) => {
    const pqrsToDelete = pqrs[index];

    if (!pqrsToDelete?.id) {
      return;
    }

    const deleted = await deletePqrsService(pqrsToDelete.id);

    if (deleted) {
      setPqrs((currentPqrs) => currentPqrs.filter((_, currentIndex) => currentIndex !== index));
    }
  };

  const deleteUser = (index) => {
    if (!isAdmin) {
      alert("No tienes permisos");
      return;
    }

    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
    saveStoredUsers(updated);
  };

  const changeUserRole = (index) => {
    if (!isAdmin) {
      alert("No tienes permisos");
      return;
    }

    const updated = [...users];
    const currentRole = updated[index].rol || updated[index].role || "empleado";
    const nextRole = currentRole === "admin" ? "empleado" : "admin";
    updated[index].rol = nextRole;
    updated[index].role = nextRole;
    setUsers(updated);
    saveStoredUsers(updated);
  };

  return (
    <>
      <Navbar />
      <section className="dashboard">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="dash-title">Panel Administrativo</h1>
          {user && <button className="btn-green" onClick={logout}>Cerrar sesión</button>}
        </div>
        <p className="dash-subtitle">Gestión completa</p>

        <div className="dash-cards">
          <div className="dash-card"><h3>Plantas</h3><p>{plants.length}</p></div>
          <div className="dash-card"><h3>Promociones</h3><p>{promos.length}</p></div>
          <div className="dash-card"><h3>PQRS</h3><p>{pqrs.length}</p></div>
          {isAdmin && <div className="dash-card"><h3>Usuarios</h3><p>{users.length}</p></div>}
        </div>

        <div className="dash-tabs">
          <button className={tab==="plantas"?"active-tab":""} onClick={()=>setTab("plantas")}>Plantas</button>
          <button className={tab==="promociones"?"active-tab":""} onClick={()=>setTab("promociones")}>Promociones</button>
          <button className={tab==="pqrs"?"active-tab":""} onClick={()=>setTab("pqrs")}>PQRS</button>
          {isAdmin && <button className={tab==="usuarios"?"active-tab":""} onClick={()=>setTab("usuarios")}>Usuarios</button>}
        </div>

        <div className="dash-content">
          {tab==="plantas" && (
            <div>
              <div className="admin-header">
                <h2>Catálogo de plantas</h2>
                <div className="admin-actions">
                  <button className="btn-white">Exportar</button>
                  <button className="btn-green" onClick={()=>setShowForm(!showForm)}>+ Nueva Planta</button>
                </div>
              </div>
              {showForm && (
                <div className="filters">
                  <input placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} />
                  <input placeholder="Precio" value={price} onChange={(e)=>setPrice(e.target.value)} />
                  <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                    <option value="">Tipo</option>
                    <option>Ornamental</option>
                    <option>Forestal</option>
                    <option>Nativa</option>
                  </select>
                  <input placeholder="Nombre científico" value={cientifico} onChange={(e)=>setCientifico(e.target.value)} />
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                  <button className="btn-green" onClick={addPlant}>Guardar</button>
                </div>
              )}
              <div className="table-container">
                <table className="admin-table">
                  <thead><tr><th>Nombre</th><th>Tipo</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead>
                  <tbody>{plants.map((p,i)=>(
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td><span className="badge tipo">{p.tipo}</span></td>
                      <td>{p.precio}</td>
                      <td><span className={p.estado==="Disponible"?"badge ok":"badge no"}>{p.estado}</span></td>
                      <td className="acciones">
                        <span>👁</span><span>✏️</span><span onClick={()=>deletePlant(i)}>🗑</span>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROMOCIONES */}
          {tab==="promociones" && (
            <div>
              <div className="admin-header">
                <h2>Promociones</h2>
                <button className="btn-green" onClick={()=>setShowPromoForm(!showPromoForm)}>+ Nueva Promoción</button>
              </div>
              {showPromoForm && (
                <div className="promo-form">
                  <input placeholder="Título" value={promoTitle} onChange={(e)=>setPromoTitle(e.target.value)} />
                  <input placeholder="Descripción" value={promoDesc} onChange={(e)=>setPromoDesc(e.target.value)} />
                  <input type="date" value={promoDate} onChange={(e)=>setPromoDate(e.target.value)} />
                  <select value={promoStatus} onChange={(e)=>setPromoStatus(e.target.value)}>
                    <option>Activa</option>
                    <option>Inactiva</option>
                  </select>
                  <button className="btn-green" onClick={addPromo}>Guardar</button>
                </div>
              )}
              <div className="promo-list">{promos.map((p,i)=>(
                <div key={i} className="promo-card">
                  <div>
                    <h3>{p.title}<span className="badge ok">{p.status}</span></h3>
                    <p>{p.desc}</p>
                    <small>Válida hasta: {p.date}</small>
                  </div>
                  <div className="promo-actions">
                    <span onClick={()=>editPromo(i)}>✏️</span>
                    <span onClick={()=>deletePromo(i)}>🗑</span>
                  </div>
                </div>
              ))}</div>
            </div>
          )}

          {/* PQRS */}
          {tab==="pqrs" && (
            <div>
              <div className="admin-header">
                <h2>PQRS Recibidos</h2>
                <button className="btn-white">⬇ Exportar Reporte</button>
              </div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr><th>ID</th><th>Tipo</th><th>Nombre</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {pqrs.length===0 ? <tr><td colSpan="6">No hay PQRS aún</td></tr> :
                      pqrs.map((p,i)=>(
                        <tr key={i}>
                          <td>#{i+1}</td>
                          <td><span className="badge tipo">{p.tipo}</span></td>
                          <td>{p.nombre}</td>
                          <td>{p.fecha}</td>
                          <td><span className={p.estado==="Pendiente"?"badge no":p.estado==="En proceso"?"badge tipo":"badge ok"}>{p.estado}</span></td>
                          <td className="acciones">
                            <span onClick={()=>changeStatus(i,"Pendiente")}>🕓</span>
                            <span onClick={()=>changeStatus(i,"En proceso")}>⚙️</span>
                            <span onClick={()=>changeStatus(i,"Resuelta")}>✅</span>
                            <span onClick={()=>deletePqrs(i)}>🗑</span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USUARIOS */}
          {tab==="usuarios" && isAdmin && (
            <div>
              <div className="admin-header"><h2>Gestión de Usuarios</h2></div>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {users.length===0 ? <tr><td colSpan="5">No hay usuarios aún</td></tr> :
                      users.map((u,i)=>(
                        <tr key={i}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td><span className="badge tipo">{u.rol || u.role || "empleado"}</span></td>
                          <td><span className={u.estado==="activo"?"badge ok":"badge no"}>{u.estado || "activo"}</span></td>
                          <td className="acciones">
                            <span onClick={()=>changeUserRole(i)}>🔄</span>
                            <span onClick={()=>deleteUser(i)}>🗑</span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
