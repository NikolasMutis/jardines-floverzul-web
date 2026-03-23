import { FaFacebook, FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "./Contactanos.css";

function Contactanos() {
  return (
    <>
      <Navbar />

      <section className="contact-page">

        {/* TITULO */}

        <div className="contact-header">

          <h1>Contáctanos</h1>

          <p>
            ¿Tienes preguntas sobre nuestras plantas o servicios?
            Estamos aquí para ayudarte.
          </p>

        </div>


        {/* TARJETAS DE CONTACTO */}

        <div className="contact-cards">

          <div className="contact-card">
            <span className="contact-icon">📞</span>
            <h3>Teléfono</h3>
            <p>+57 300 123 4567</p>
          </div>


          <div className="contact-card">
            <span className="contact-icon">📧</span>
            <h3>Email</h3>
            <p>info@floverzul.com</p>
          </div>


          {/* WHATSAPP REAL */}

          <a
            href="https://wa.me/573001234567"
            target="_blank"
            className="contact-card"
          >
            <span className="contact-icon">💬</span>
            <h3>WhatsApp</h3>
            <p>Escríbenos directamente</p>
          </a>


          <div className="contact-card">
            <span className="contact-icon">📍</span>
            <h3>Ubicación</h3>
            <p>Jardines Floverzul</p>
          </div>

        </div>


        {/* REDES Y HORARIOS */}

        <div className="contact-info-section">


          {/* REDES SOCIALES */}

          <div className="contact-box">

            <h2>Síguenos en redes sociales</h2>

            <div className="social-icons">

              <a
                href="https://facebook.com"
                target="_blank"
                className="social-circle"
                rel = "noopener noreferrer">
                    <FaFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="social-circle"
                rel= "noopener noreferrer">
                    <FaInstagram/>
              </a>

            </div>

          </div>


          {/* HORARIOS */}

          <div className="contact-box">

            <h2>Horarios de atención</h2>

            <ul className="schedule">

              <li><span>Lunes - Viernes</span> <span>8:00 AM - 6:00 PM</span></li>

              <li><span>Sábados</span> <span>9:00 AM - 5:00 PM</span></li>

              <li><span>Domingos</span> <span>10:00 AM - 2:00 PM</span></li>

              <li><span>Festivos</span> <span>Cerrado</span></li>

            </ul>

          </div>

        </div>


        {/* MAPA */}

        <h2 className="map-title">Mapa de ubicación</h2>

        <div className="map-container">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.31549953268!2d-77.79163432527328!3d0.9096456628331614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e295d0994eb82bd%3A0x807da1a670c904cb!2sJARDINES%20FLOVERZUL!5e0!3m2!1ses-419!2sco!4v1772024385362!5m2!1ses-419!2sco"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>

        </div>

      </section>
    </>
  );
}

export default Contactanos;