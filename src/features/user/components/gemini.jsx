import React, { useState } from "react";

const PersonalAssistant = () => {
  const [prompt, setPrompt] = useState(""); // Kullanıcıdan gelen soru ya da komut
  const [messages, setMessages] = useState([]); // Sohbet mesajları

  const generateResponse = async () => {
    // Kullanıcı mesajını sohbet geçmişine ekle
    setMessages([...messages, { role: "user", text: prompt }]);

    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: prompt }), // ✅ doğru key: content
      });

      const result = await response.json();
      const assistantMessage = result.generatedContent;

      // Cevabı ekle
      setMessages([
        ...messages,
        { role: "assistant", text: assistantMessage },
      ]);

      // Metin kutusunu temizle
      setPrompt("");
    } catch (error) {
      console.error("Hata oluştu:", error);
      setMessages([
        ...messages,
        {
          role: "assistant",
          text: "Bir hata oluştu. Lütfen tekrar deneyin.",
        },
      ]);
    }
  };

  return (
    <div>
      <h1>AI Fısıltı</h1>
      <div className="chat-container">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index}>
              {message.role === "user" && (
                <div className="user-message">
                  <strong>Kullanıcı:</strong> {message.text}
                </div>
              )}
              {message.role === "assistant" && (
                <div className="assistant-message">
                  <strong>Asistan:</strong> {message.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Soru sor ya da komut ver..."
      ></textarea>
      <br />
      <button onClick={generateResponse}>Yanıt Al</button>
    </div>
  );
};

export default PersonalAssistant;
