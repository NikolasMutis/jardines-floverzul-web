import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import InfoSection from "../components/InfoSection";
import TextSection from "../components/TextSection";
import CardsSection from "../components/CardsSection";

import "./Home.css";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="about-layout">
        <Gallery />
        <InfoSection />
      </section>
      <TextSection />
      <CardsSection />
    </>
  );
}

export default Home;