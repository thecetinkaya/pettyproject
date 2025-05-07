import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // React Icons kullanarak ok ikonlarını ekledik
import "../../styles/Sss.css"; // CSS dosyasını import ediyoruz

const Sss = () => {
  // Her bir soru için 'isOpen' durumunu tutan bir state
  const [openIndex, setOpenIndex] = useState(null);

  // Soruların ve cevaplarının verileri
  const faqs = [
    {
      question: "1. Online veteriner hizmeti nasıl çalışır?",
      answer:
        "Platformumuz üzerinden veterinerlerle görüntülü veya sesli görüşme yaparak evcil hayvanınız için danışmanlık alabilirsiniz.",
    },
    {
      question: "2. Online görüşmeler ücretli mi?",
      answer:
        "Evet, her veteriner kendi ücret tarifesini belirler. Görüşme öncesinde ücret bilgilerini görebilirsiniz.",
    },
    {
      question: "3. Veterinerlerle nasıl iletişime geçebilirim?",
      answer:
        "Sitemizdeki Veterinerler bölümünden uzmanları inceleyerek uygun olan birini seçebilir ve randevu alabilirsiniz.",
    },
    {
      question: "4. Evcil hayvanımın aşı takvimini takip edebilir miyim?",
      answer:
        "Evet! Aşı ve muayene hatırlatıcı hizmetimiz ile evcil hayvanınızın sağlık programını takip edebilirsiniz.",
    },
    {
      question: "5. Hesabımı nasıl oluşturabilirim?",
      answer:
        "Anasayfadaki Kayıt Ol butonuna tıklayarak e-posta adresinizle hızlıca üye olabilirsiniz.",
    },
  ];

  // Soruya tıklandığında cevabı açma / kapama
  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Eğer aynı soruya tekrar tıklanırsa, cevabı kapat
    } else {
      setOpenIndex(index); // Cevap açılır
    }
  };

  return (
    <section id="sss" className="sss-container">
      <h2 className="sss-title">Sıkça Sorulan Sorular</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="sss-item">
          <div className="sss-header" onClick={() => toggleAnswer(index)}>
            <h3 className="sss-question">{faq.question}</h3>
            <div className="sss-toggle-icon">
              {openIndex === index ? (
                <FiChevronUp size={20} color="#e11d48" />
              ) : (
                <FiChevronDown size={20} color="#e11d48" />
              )}
            </div>
          </div>
          {openIndex === index && <p className="sss-answer">{faq.answer}</p>}
        </div>
      ))}
    </section>
  );
};

export default Sss;
