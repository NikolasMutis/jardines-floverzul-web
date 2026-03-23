import "./MapSection.css";

function MapSection() {
  return (
    <section className="map-section">

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.31549953268!2d-77.79163432527328!3d0.9096456628331614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e295d0994eb82bd%3A0x807da1a670c904cb!2sJARDINES%20FLOVERZUL!5e0!3m2!1ses-419!2sco!4v1772024385362!5m2!1ses-419!2sco"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default MapSection;