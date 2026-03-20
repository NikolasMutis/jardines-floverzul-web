import { useState, useEffect } from "react";
import "./Gallery.css";

import img1 from "../assets/Planta1.jpg";
import img2 from "../assets/Planta2.jpg";

function Gallery() {

  const images = [img1, img2];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="gallery">

      <button className="arrow left" onClick={prevSlide}>❮</button>

      <img src={images[current]} alt="Planta" />

      <button className="arrow right" onClick={nextSlide}>❯</button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>

    </section>
  );
}

export default Gallery;