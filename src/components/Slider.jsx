import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css"; // Swiper CSS
import "swiper/css/pagination"; // Pagination CSS
import "swiper/css/navigation"; // Navigation CSS

import team1 from "../assets/vets/vet1.png"; // Kendi resimlerinizi kullanın
import team2 from "../assets/vets/vet2.png";
import team3 from "../assets/vets/vet3.png";
import team4 from "../assets/vets/vet4.png";
import team5 from "../assets/vets/vet5.png";

const VetSlider = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 3, // Aynı anda 3 öğe gözüksün
      spaceBetween: 20, // Öğeler arasındaki boşluk
      loop: true, // Döngü ile kayma
      autoplay: {
        delay: 3000, // 3 saniye sonra kaydırma
        disableOnInteraction: false, // Kullanıcı etkileşimi olsa bile kaydırmaya devam et
      },
      pagination: {
        el: ".swiper-pagination", // Sayfalama
        clickable: true, // Tıklanabilir sayfa numarası
      },
      navigation: {
        nextEl: ".swiper-button-next", // Sonraki buton
        prevEl: ".swiper-button-prev", // Önceki buton
      },
      breakpoints: {
        // Responsive ayarlar
        320: {
          slidesPerView: 1, // Küçük ekranlarda tekli gösterim
        },
        768: {
          slidesPerView: 2, // Orta boy ekranlarda 2 öğe
        },
        1024: {
          slidesPerView: 3, // Büyük ekranlarda 3 öğe
        },
      },
    });

    // Cleanup
    return () => swiper.destroy();
  }, []);

  return (
    <div id="vet" className="relative max-w-7xl mx-auto py-16">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Veteriner Hekimlerimiz
      </h2>

      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Slider Item 1 */}
          <div className="swiper-slide">
            <div className="testimonial p-8 bg-white shadow-lg rounded-lg">
              <div className="testimonial-pic mb-6">
                <img
                  src={team1}
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  alt="Veteriner 1"
                />
              </div>
              <div className="testimonial-review text-center mb-6">
                <h5 className="testimonial-title text-2xl font-semibold text-gray-800">
                  Lucianna Smith
                </h5>
                <span className="text-lg text-gray-600">Veteriner Hekim</span>
              </div>
            </div>
          </div>

          {/* Slider Item 2 */}
          <div className="swiper-slide">
            <div className="testimonial p-8 bg-white shadow-lg rounded-lg">
              <div className="testimonial-pic mb-6">
                <img
                  src={team2}
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  alt="Veteriner 2"
                />
              </div>
              <div className="testimonial-review text-center mb-6">
                <h5 className="testimonial-title text-2xl font-semibold text-gray-800">
                  John Sadana
                </h5>
                <span className="text-lg text-gray-600">Veteriner Hekim</span>
              </div>
            </div>
          </div>

          {/* Slider Item 3 */}
          <div className="swiper-slide">
            <div className="testimonial p-8 bg-white shadow-lg rounded-lg">
              <div className="testimonial-pic mb-6">
                <img
                  src={team3}
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  alt="Veteriner 3"
                />
              </div>
              <div className="testimonial-review text-center mb-6">
                <h5 className="testimonial-title text-2xl font-semibold text-gray-800">
                  Jane Janeth
                </h5>
                <span className="text-lg text-gray-600">Veteriner Hekim</span>
              </div>
            </div>
          </div>

          {/* Slider Item 4 */}
          <div className="swiper-slide">
            <div className="testimonial p-8 bg-white shadow-lg rounded-lg">
              <div className="testimonial-pic mb-6">
                <img
                  src={team4}
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  alt="Veteriner 4"
                />
              </div>
              <div className="testimonial-review text-center mb-6">
                <h5 className="testimonial-title text-2xl font-semibold text-gray-800">
                  Sarah Lee
                </h5>
                <span className="text-lg text-gray-600">Veteriner Hekim</span>
              </div>
            </div>
          </div>

          {/* Slider Item 5 */}
          <div className="swiper-slide">
            <div className="testimonial p-8 bg-white shadow-lg rounded-lg">
              <div className="testimonial-pic mb-6">
                <img
                  src={team5}
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                  alt="Veteriner 5"
                />
              </div>
              <div className="testimonial-review text-center mb-6">
                <h5 className="testimonial-title text-2xl font-semibold text-gray-800">
                  Emma Brown
                </h5>
                <span className="text-lg text-gray-600">Veteriner Hekim</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="swiper-pagination"></div>

        {/* Navigation Buttons */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

export default VetSlider;
