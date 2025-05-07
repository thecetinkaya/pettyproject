import React from "react";
import resim from "../../assets/resim.png";
import appstore from "../../assets/appstore.png";
import playstore from "../../assets/playstore.png";
import "../../styles/Home.css"; // CSS dosyasını içe aktardık

const Home = () => {
  return (
    <section id="home" className="home-container">
      {/* Sol Taraf: Yazılar */}
      <div className="home-text">
        <h1 className="home-title">
          Online veteriner hizmetlerine Hoşgeldiniz!
        </h1>
        <p className="home-description">
          Uzman veterinerlerimizle dostlarınıza en iyi hizmeti sunuyoruz. Hemen
          randevu alın!
        </p>
        <div className="button-group">
          <button className="btn btn-primary">Randevu Al</button>
          <button className="btn btn-secondary">PETTY'i Keşfet</button>
        </div>

        {/* Mobil Uygulama İndirme Bölümü */}
        <div className="download-section">
          <h2 className="download-title">
            Mobil Uygulamamızı buradan indirebilirsiniz.
          </h2>
          <div className="download-buttons">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={appstore} alt="App Store" className="store-logo" />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={playstore} alt="Google Play" className="store-logo" />
            </a>
          </div>
        </div>
      </div>

      {/* Sağ Taraf: Resim */}
      <div className="home-image">
        <img src={resim} alt="Veteriner Kadın" className="hero-image" />
      </div>
    </section>
  );
};

export default Home;
