import React from "react";
import "../styles/ServicesPage.css"; // CSS dosyasını içe aktardık
import online from "../assets/services/online.png";
import emergency from "../assets/services/emergency.png";
import vaccine from "../assets/services/vaccine.png";
import care from "../assets/services/care.png";
import appointment from "../assets/services/appointment.png";
import health from "../assets/services/health.png";

const services = [
  { id: 1, title: "Online Danışmanlık", image: online },
  { id: 2, title: "Acil Müdahale", image: emergency },
  { id: 3, title: "Aşı Takibi", image: vaccine },
  { id: 4, title: "Pet Bakımı", image: care },
  { id: 5, title: "Randevu Planlama", image: appointment },
  { id: 6, title: "Sağlık Kontrolü", image: health },
];

const ServicesPage = () => {
  return (
    <section id="services" className="services-container">
      <h2 className="services-title">Hizmetlerimiz</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => alert(service.title)}
          >
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;
