import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiSend } from "react-icons/fi";
import { BsRobot, BsPerson } from "react-icons/bs";

// Animasyonlar
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const ChatContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: #f5f5f5;
`;

const Message = styled.div`
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  flex-direction: ${(props) => (props.role === "user" ? "row-reverse" : "row")};
  gap: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${(props) =>
    props.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  background: ${(props) =>
    props.role === "user"
      ? "linear-gradient(135deg, #6e8efb, #a777e3)"
      : "white"};
  color: ${(props) => (props.role === "user" ? "white" : "#333")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(props) =>
    props.role === "user"
      ? "linear-gradient(135deg, #a777e3, #6e8efb)"
      : "#e0e0e0"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.role === "user" ? "white" : "#666")};
  flex-shrink: 0;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background: white;
  border-top: 1px solid #eee;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  border-radius: 24px;
  padding: 12px 20px;
  resize: none;
  outline: none;
  font-size: 1rem;
  background: #f0f0f0;
  transition: all 0.3s;
  max-height: 150px;

  &:focus {
    background: white;
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.3);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(110, 142, 251, 0.3);
  }

  &:disabled {
    background: #ccc;
    animation: none;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 5px;
  padding: 12px 16px;
  background: white;
  border-radius: 18px;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  animation: ${pulse} 1.5s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay || "0s"};
`;

const PersonalAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Merhaba! Ben PettyChat. Size nasıl yardımcı olabilirim?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Yeni mesaj geldiğinde otomatik scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateResponse = async () => {
    if (!prompt.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: prompt }),
      });

      const result = await response.json();
      const assistantMessage = result.generatedContent;

      // Cevabı ekle
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: assistantMessage },
      ]);
    } catch (error) {
      console.error("Hata oluştu:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Bir hata oluştu. Lütfen tekrar deneyin.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateResponse();
    }
  };

  return (
    <ChatContainer>
      <Header>
        <BsRobot size={24} />
        <span>PettyChat</span>
      </Header>

      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} role={message.role}>
            <Avatar role={message.role}>
              {message.role === "user" ? <BsPerson /> : <BsRobot />}
            </Avatar>
            <MessageBubble role={message.role}>{message.text}</MessageBubble>
          </Message>
        ))}

        {isTyping && (
          <Message role="assistant">
            <Avatar role="assistant">
              <BsRobot />
            </Avatar>
            <MessageBubble role="assistant">
              <TypingIndicator>
                <Dot $delay="0s" />
                <Dot $delay="0.2s" />
                <Dot $delay="0.4s" />
              </TypingIndicator>
            </MessageBubble>
          </Message>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Mesaj yaz..."
          rows="1"
          onKeyDown={handleKeyDown}
        />
        <SendButton
          onClick={generateResponse}
          disabled={!prompt.trim() || isTyping}
        >
          <FiSend size={20} />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default PersonalAssistant;
