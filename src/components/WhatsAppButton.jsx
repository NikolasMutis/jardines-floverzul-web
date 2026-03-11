import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  return (

    <a
      href="https://wa.me/573001234567"
      target="_blank"
      className="whatsapp-button"
      rel = "noopener noreferrer">
        <FaWhatsapp />
    </a>

  );
}

export default WhatsAppButton;