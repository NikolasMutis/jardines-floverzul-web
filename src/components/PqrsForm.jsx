import "./PqrsForm.css";

function PqrsForm() {
  return (
    <section className="pqrs-form-section">
      <div className="form-container">

        <h2 className="form-title">Formulario PQRS</h2>

        <form className="pqrs-form">

          {/* Fila Nombre y Correo */}
          <div className="form-row">
            <div className="form-group">
              <label>Nombre completo *</label>
              <input type="text" placeholder="Ingresa tu nombre completo" required />
            </div>

            <div className="form-group">
              <label>Correo electrónico *</label>
              <input type="email" placeholder="Ingresa tu correo@gmail.com" required />
            </div>
          </div>

          {/* Tipo de solicitud */}
          <div className="form-group">
            <label>Tipo de solicitud *</label>
            <select required>
              <option value="">Selecciona una opción</option>
              <option>Petición</option>
              <option>Queja/Reclamo</option>
              <option>Sugerencia</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label>Descripción detallada *</label>
            <textarea
              rows="5"
              placeholder="Describe tu solicitud con el mayor detalle posible..."
              required
            ></textarea>
          </div>

          {/* Archivo */}
          <div className="form-group">
            <label>Adjuntar archivo (opcional)</label>
            <input type="file" />
          </div>

          {/* Información importante */}
          <div className="info-box">
            <p>
              Recibirás una confirmación por correo electrónico
              Tu solicitud será atendida en un plazo de 5 días hábiles 
              Todas las PQRS son tratadas de manera confidencial 
              Puedes hacer seguimiento con el número de radicado que te enviaremos
            </p>
          </div>

          {/* Botón */}
          <button type="submit" className="submit-btn">
            📝Enviar PQRS
          </button>

        </form>
      </div>
    </section>
  );
}

export default PqrsForm;