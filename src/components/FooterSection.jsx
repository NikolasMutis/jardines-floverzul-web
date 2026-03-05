import "./FooterSection.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaClock
} from "react-icons/fa";


function FooterSection() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUMNA 1 */}
        <div className="footer-column">
          <h3>Contáctanos</h3>

          <p><FaMapMarkerAlt className="icon" /> Cra 7 # 19-66, Cumbal, Nariño</p>

          <p>
            <FaPhone className="icon" />
            <a href="tel:+573000000000">+57 312 2738542</a>
          </p>

          <p>
            <FaEnvelope className="icon" />
            <a href="mailto:contacto@floverzul.com">
              info@floverzul,com
            </a>
          </p>

        </div>

        {/* COLUMNA 2 */}
        <div className="footer-column">
          <h3>Horarios de Atención</h3>

          <p><FaClock className="icon" /> Lunes - Viernes: 8:00am - 6:00pm</p>
          <p className="no-icon">Sábados: 9:00am - 5:00pm</p>
          <p className="no-icon"> Domingos: 10:00 am - 2:00pm</p>
        </div>

        {/* COLUMNA 3 */}
        <div className="footer-column">
          <h3>Síguenos</h3>
          <p>Conectate con nosotros en redes sociales.</p>

          <div className="social-buttons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>

            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default FooterSection;