import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Merhaba! Ben veterinerlik konusunda yardımcı olabilecek bir asistanım. Size nasıl yardımcı olabilirim?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Veterinerlik API'si ile iletişim
  const fetchVetAIResponse = async (userMessage) => {
    setIsTyping(true);

    try {
      // API isteği burada olacak
      // Örnek: await fetch('your-vet-api-endpoint', {...})
      // Simüle edilmiş yanıt:
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const vetResponses = [
        "Bu durumda veterinerinize başvurmanızı öneririm.",
        "Evcil hayvanınızın aşı takvimi için şu bilgileri verebilirim...",
        "Bu belirtiler acil müdahale gerektirebilir, en yakın veteriner kliniğine gitmelisiniz.",
      ];
      const randomResponse =
        vetResponses[Math.floor(Math.random() * vetResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: randomResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Teknik bir sorun oluştu. Lütfen daha sonra tekrar deneyin.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    fetchVetAIResponse(inputValue);
  };

  // Otomatik scroll ve yükseklik ayarı
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 h-screen w-screen overflow-hidden">
      {/* Header (isteğe bağlı) */}
      <header className="bg-blue-600 text-white p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Veteriner Destek Asistanı</h1>
          <button className="text-white hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mesaj alanı - Tam ekranın büyük kısmını kaplayacak */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 container mx-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-full lg:max-w-2xl rounded-lg px-4 py-2 ${
                message.isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
              style={{ wordBreak: "break-word" }}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Mesaj gönderme formu */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="container mx-auto">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Veterinerlikle ilgili sorunuzu yazın..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 disabled:opacity-50 flex items-center justify-center w-12 h-12"
              disabled={!inputValue.trim() || isTyping}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
