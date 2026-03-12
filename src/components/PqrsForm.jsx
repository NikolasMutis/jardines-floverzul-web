import "./PqrsForm.css";

function PqrsForm({ tipo }) {

  const titulo = {
    peticion: "Formulario de Petición",
    queja: "Formulario de Queja / Reclamo",
    sugerencia: "Formulario de Sugerencia"
  };

  return (

    <section className="pqrs-form-section">

      <h2 className="form-title">{titulo[tipo]}</h2>

      <form className="pqrs-form">

        <div className="form-row">

          <div className="form-group">
            <label>Nombre completo *</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Correo electrónico *</label>
            <input type="email" required />
          </div>

        </div>

        <div className="form-group">
          <label>Descripción *</label>
          <textarea rows="5" required></textarea>
        </div>

        <div className="form-group">
          <label>Adjuntar archivo (opcional)</label>
          <input type="file"/>
        </div>

        <div className = "info-box">
          <h4>Información Importante</h4>

          <ul>
            <li>Recibirás una confirmación por correo electrónico</li>
            <li>Tu solicitud será atendida en un plazo de 5 días hábiles</li>
            <li>Todas las PQRS son tratadas de manera confidencial</li>
            <li>Puedes hacer seguimiento con el número de radicado que te enviaremos</li>
          </ul>
        </div>

        <button className="submit-btn">
          Enviar {tipo}
        </button>

      </form>

    </section>

  );
}

export default PqrsForm;