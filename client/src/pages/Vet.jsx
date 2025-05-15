import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import team1 from "../assets/vets/vet1.png"
import team2 from "../assets/vets/vet2.png"
import team3 from "../assets/vets/vet3.png"
import team4 from "../assets/vets/vet4.png"
import team5 from "../assets/vets/vet5.png"



const vetData = [
  { img: team1, name: "Lucianna Smith", title: "Veteriner Hekim" },
  { img: team2, name: "John Sadana", title: "Veteriner Hekim" },
  { img: team3, name: "Jane Janeth", title: "Veteriner Hekim" },
  { img: team4, name: "Sarah Lee", title: "Veteriner Hekim" },
  { img: team5, name: "Emma Brown", title: "Veteriner Hekim" },
];

const Vet = () => {
  return (
    <div id="vet" className="relative max-w-7xl mx-auto py-16">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Veteriner Hekimlerimiz
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {vetData.map((vet, index) => (
          <SwiperSlide key={index}>
            <div className="p-8 bg-white shadow-lg rounded-lg text-center">
              <img
                src={vet.img}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                alt={vet.name}
              />
              <h5 className="text-2xl font-semibold text-gray-800">
                {vet.name}
              </h5>
              <span className="text-lg text-gray-600">{vet.title}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Vet;
