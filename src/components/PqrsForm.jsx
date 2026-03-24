import "./PqrsForm.css";
import { useState } from "react";
import { createPqrs } from "../services/pqrsService";

function PqrsForm({ tipo }) {

  const [nombre,setNombre] = useState("")
  const [correo,setCorreo] = useState("")
  const [mensaje,setMensaje] = useState("")
  const [satisfaccion,setSatisfaccion] = useState("")

  const titulo = {
    peticion: "Formulario de Petición",
    queja: "Formulario de Queja / Reclamo",
    sugerencia: "Formulario de Sugerencia"
  };

  const enviarPQRS = async () => {

    if(nombre === "" || correo === "" || mensaje === ""){
      alert("Completa los campos")
      return
    }

    const nueva = {
      tipo: tipo,
      nombre: nombre,
      correo: correo,
      mensaje: mensaje,
      satisfaccion: satisfaccion,
      estado: "Pendiente"
    }

    const createdPqrs = await createPqrs(nueva)

    if (!createdPqrs) {
      alert("No fue posible enviar la PQRS")
      return
    }

    setNombre("")
    setCorreo("")
    setMensaje("")
    setSatisfaccion("")

    alert("PQRS enviada 💚")
  }

  return (

    <section className="pqrs-form-section">

      <h2 className="form-title">{titulo[tipo]}</h2>

      <form 
        className="pqrs-form"
        onSubmit={(e)=>{
          e.preventDefault()
          enviarPQRS()
        }}
      >

        <div className="form-row">

          <div className="form-group">
            <label>Nombre completo *</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e)=>setNombre(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico *</label>
            <input 
              type="email" 
              value={correo}
              onChange={(e)=>setCorreo(e.target.value)}
              required 
            />
          </div>

        </div>

        <div className="form-group">
          <label>Descripción *</label>
          <textarea 
            rows="5" 
            value={mensaje}
            onChange={(e)=>setMensaje(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Adjuntar archivo (opcional)</label>
          <input type="file"/>
        </div>

        <div className="info-box">
          <h4>Información Importante</h4>
          <ul>
            <li>Recibirás confirmación por correo</li>
            <li>Tiempo de respuesta: 5 días hábiles</li>
            <li>Tratamiento confidencial</li>
          </ul>
        </div>

        <div className="satisfaccion-box">

          <h4>¿Qué tan satisfecho se encuentra con nuestro servicio?</h4>

          <div className="satisfaccion-options">

            <button 
              type="button" 
              className={`emoji rojo ${satisfaccion==="rojo" ? "active" : ""}`}
              onClick={()=>setSatisfaccion("rojo")}
            >😡</button>

            <button 
              type="button" 
              className={`emoji naranja ${satisfaccion==="naranja" ? "active" : ""}`}
              onClick={()=>setSatisfaccion("naranja")}
            >😕</button>

            <button 
              type="button" 
              className={`emoji amarillo ${satisfaccion==="amarillo" ? "active" : ""}`}
              onClick={()=>setSatisfaccion("amarillo")}
            >😐</button>

            <button 
              type="button" 
              className={`emoji verde ${satisfaccion==="verde" ? "active" : ""}`}
              onClick={()=>setSatisfaccion("verde")}
            >🙂</button>

            <button 
              type="button" 
              className={`emoji feliz ${satisfaccion==="feliz" ? "active" : ""}`}
              onClick={()=>setSatisfaccion("feliz")}
            >😄</button>

          </div>

        </div>

        <button className="submit-btn">
          Enviar {tipo}
        </button>

      </form>

    </section>

  );
}

export default PqrsForm;