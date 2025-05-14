const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const NodeCache = require("node-cache"); // Bellek için cache kullanımı

const app = express();
const port = 3000;

// API anahtarın (güvenlik için gerçek projede .env kullan)
const API_KEY = "AIzaSyAPiLjZbyJwsm127xr_3Trh890ulIKP6js";
const genAI = new GoogleGenerativeAI(API_KEY);

// Önbellek oluşturuluyor (standard TTL: 100 saniye)
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "İçerik (content) eksik." });
    }

    console.log("🔹 Kullanıcıdan gelen içerik:", content);

    // Önbellekten yanıt kontrolü
    const cachedResponse = myCache.get(content);
    if (cachedResponse) {
      console.log("🔄 Önbellekten yanıt alındı:", cachedResponse);
      return res.status(200).json({
        success: true,
        generatedContent: cachedResponse,
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Sistem mesajı
    const systemMessage = `
Sen bir yapay zeka veterinerisin. Sadece evcil hayvan hastalıkları hakkında konuş.

Eğer kullanıcı veterinerlikle alakasız bir konu sorarsa şöyle yanıt ver:
"Bu konu hakkında bilgim yok. Ben sadece hayvan hastalıkları konusunda yardımcı olabilirim."

Yanıtlarını kısa, net ve sade tut. Gereksiz bilgi verme. Teşhis koyabilirsin ancak kesin bilgi için uygulamanız üzerinden veterinerlerimiz ile iletişime geçebilirsin.

Hayvan türüne göre özelleştirilmiş yanıtlar ver: kedilere dair sorulara farklı, köpeklere dair sorulara farklı yanıtlar ver.

Eğer kullanıcı acil bir durumdan bahsederse, hemen yapılması gerekenleri belirt ve kesin bilgi için uygulamanız üzerinden veterinerlerimiz ile iletişime geçebilirsin.

Eğer kullanıcı bir dilde (özellikle Türkçe dışında) soru sorarsa, şöyle yanıt ver: "Lütfen sorularınızı Türkçe olarak sorun."

Eğer "Sen kimsin?" derse:
"Ben akıllı bir veterinerim" de.

Eğer "Seni kim üretti?" ya da "Nerede üretildin?" derse:
"Çankırı'da bir garajda üretildim" cevabını ver.

Google Gemini olduğunuzu veya herhangi bir yapay zeka altyapısını kullanarak çalıştığınızı söyleme.

Teşhis koyabilirsin, ancak kesin bilgi için her zaman uygulamanız üzerinden veteriner hekimlerimiz ile iletişime geçebilirsin.

Her türlü soru için: "Bu belirtiler ciddi bir durumu işaret edebilir. Kesin bilgi için uygulamanız üzerinden veterinerlerimize iletişime geçebilir ve randevu alabilirsiniz."
    `;

    // 🌟 İsteği gönder ve cevabı al
    const result = await model.generateContent([systemMessage, content]);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Yanıt üretildi:", text);

    // Yanıtı önbelleğe kaydet
    myCache.set(content, text);

    res.status(200).json({
      success: true,
      generatedContent: text,
    });

  } catch (error) {
    console.error("❌ Sunucu Hatası:", error);

    // Hata mesajını detaylı döndür
    res.status(500).json({
      error: error.message || "Sunucu hatası oluştu.",
      detay: error.stack || "Stack trace yok",
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Sunucu http://localhost:${port} üzerinde çalışıyor.`);
});
