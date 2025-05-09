import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/logo1.png';
function ChatPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const botMsg = { sender: 'bot', text: data.answer };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* 🌌 Starfield background */}
      <div className="starfield">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* 💬 Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <img src={logo} alt="Logo" className="chat-logo" />
          <h1 className="chat-title">SUSTAINABILITY LLM</h1>
        </div>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <textarea
            rows="2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatPage;

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Comic Sans MS', sans-serif;
    background: url('/cosmic-bg.png') no-repeat center center fixed;
    background-size: cover;
    color: white;
    height: 100vh;
    overflow: hidden;
  }

  .starfield {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .star {
    position: absolute;
    width: 2px; height: 2px;
    background: white;
    border-radius: 50%;
    animation: moveStar linear infinite;
  }

  @keyframes moveStar {
    0% { transform: translateY(0); }
    100% { transform: translateY(100vh); }
  }

  .chat-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 900px;
    height: 100vh;
    margin: 5vh auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(30px);
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .chat-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .chat-title {
    font-size: 28px;
    color: #ffd700;
    font-family: 'Comic Sans MS', sans-serif;
  }

  .chat-window {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }

  .chat-bubble {
    max-width: 70%;
    padding: 15px;
    border-radius: 15px;
    font-size: 18px;
    line-height: 1.4;
    animation: fadeIn 0.5s ease;
  }

  .user-bubble {
    background-color: #2575fc;
    align-self: flex-end;
    color: white;
    border-bottom-right-radius: 0;
  }

  .bot-bubble {
    background-color: #444;
    align-self: flex-start;
    color: #ddd;
    border-bottom-left-radius: 0;
  }

  .input-area {
    display: flex;
    gap: 10px;
  }

  .input-area textarea {
    flex: 1;
    padding: 15px;
    font-size: 18px;
    border-radius: 15px;
    border: none;
    resize: none;
    background-color: #2b2b2b;
    color: white;
  }

  .input-area textarea:focus {
    outline: none;
    box-shadow: 0 0 10px #6a11cb;
  }

  .input-area button {
    padding: 0 25px;
    border: none;
    border-radius: 15px;
    background-color: #6a11cb;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .input-area button:hover {
    transform: scale(1.05);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
