import { useState } from "react";
import "./PqrsForm.css";
import { createPQRS } from "../services/pqrsService";

const PqrsForm = ({ tipo = "peticion" }) => {
  const titulo = {
    peticion: "Formulario de Petición",
    queja: "Formulario de Queja / Reclamo",
    reclamo: "Formulario de Queja / Reclamo",
    sugerencia: "Formulario de Sugerencia",
  };

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  const validar = () => {
    const nuevosErrores = {};
    const nombreLimpio = nombre.trim();
    const asuntoLimpio = asunto.trim();
    const descripcionLimpia = descripcion.trim();

    if (!nombreLimpio || nombreLimpio.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(nombreLimpio)) {
      nuevosErrores.nombre = "El nombre solo puede contener letras y espacios.";
    }

    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      nuevosErrores.correo = "El correo no tiene un formato válido.";
    }

    if (!asuntoLimpio || asuntoLimpio.length < 5) {
      nuevosErrores.asunto =
        "El asunto es obligatorio y debe tener al menos 5 caracteres.";
    }

    if (!descripcionLimpia || descripcionLimpia.length < 10) {
      nuevosErrores.descripcion =
        "La descripción es obligatoria y debe tener al menos 10 caracteres.";
    }

    const tiposValidos = ["peticion", "queja", "reclamo", "sugerencia"];
    if (!tipo || !tiposValidos.includes(tipo)) {
      nuevosErrores.tipo =
        "El tipo de solicitud no es válido. Selecciona una opción.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!validar()) {
      return;
    }

    try {
      setEnviando(true);

      // En un escenario real deberíamos tomar user_id del usuario autenticado
      const user_id = null;

      const { error } = await createPQRS({
        nombre: nombre.trim(),
        correo: correo.trim(),
        tipo,
        asunto: asunto.trim(),
        descripcion: descripcion.trim(),
        user_id,
      });

      if (error) {
        console.error("Error al enviar PQRS:", error);
        setMensaje(
          error?.message || "Hubo un error al enviar tu solicitud. Inténtalo de nuevo."
        );
        return;
      }

      setMensaje("Tu PQRS se ha enviado correctamente.");
      setNombre("");
      setCorreo("");
      setAsunto("");
      setDescripcion("");
      setErrores({});
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="pqrs-form-section">
      <h2 className="form-title">{titulo[tipo] ?? "Formulario PQRS"}</h2>

      <form className="pqrs-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre completo *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && (
              <p className="error-text">{errores.nombre}</p>
            )}
          </div>

          <div className="form-group">
            <label>Correo electrónico *</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errores.correo && (
              <p className="error-text">{errores.correo}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Asunto *</label>
          <input
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
          {errores.asunto && <p className="error-text">{errores.asunto}</p>}
        </div>

        <div className="form-group">
          <label>Descripción *</label>
          <textarea
            rows="5"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          {errores.descripcion && (
            <p className="error-text">{errores.descripcion}</p>
          )}
        </div>

        <div className="form-group">
          <label>Adjuntar archivo (opcional)</label>
          <input type="file" />
        </div>

        {errores.tipo && <p className="error-text">{errores.tipo}</p>}

        {mensaje && <p className="info-text">{mensaje}</p>}

        <button className="submit-btn" type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : `Enviar ${tipo}`}
        </button>
      </form>

      <div className="info-box">
        <h4>Información Importante</h4>
        <ul>
          <li>Recibirás una confirmación por correo electrónico</li>
          <li>Tu solicitud será atendida en un plazo de 5 días hábiles</li>
          <li>Todas las PQRS son tratadas de manera confidencial</li>
          <li>
            Puedes hacer seguimiento con el número de radicado que te enviaremos
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PqrsForm;