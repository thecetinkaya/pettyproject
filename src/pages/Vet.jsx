import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/Vet.css"; // CSS dosyası

import team1 from "../assets/vets/vet1.png";
import team2 from "../assets/vets/vet2.png";
import team3 from "../assets/vets/vet3.png";
import team4 from "../assets/vets/vet4.png";
import team5 from "../assets/vets/vet5.png";

const vets = [
  { id: 1, name: "Lucianna Smith", image: team1 },
  { id: 2, name: "John Sadana", image: team2 },
  { id: 3, name: "Jane Janeth", image: team3 },
  { id: 4, name: "Sarah Lee", image: team4 },
  { id: 5, name: "Emma Brown", image: team5 },
];

const Vet = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000, // 3 saniyede bir değişim
        disableOnInteraction: false, // Kullanıcı kaydırınca da devam etsin
      },
      speed: 800, // Kaydırma süresi (ms)
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });

    return () => swiper.destroy();
  }, []);

  return (
    <section id="vet" className="vet-container">
      <h2 className="vet-title">Veteriner Hekimlerimiz</h2>

      <div className="swiper-container">
        <div className="swiper-wrapper">
          {vets.map((vet) => (
            <div key={vet.id} className="swiper-slide">
              <div className="vet-card">
                <img src={vet.image} className="vet-image" alt={vet.name} />
                <div className="vet-info">
                  <h5 className="vet-name">{vet.name}</h5>
                  <span className="vet-role">Veteriner Hekim</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vet;
