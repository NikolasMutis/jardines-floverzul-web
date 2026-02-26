import { useState } from "react";
import "./Gallery.css";

import img1 from "../assets/planta1.jpg";
import img2 from "../assets/planta2.jpg";

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

  return (
    <section className="gallery">
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>

      <img src={images[current]} alt="Planta" />

      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>
    </section>
  );
}

export default Gallery;


