// Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput) {
        console.error('User input is empty');
        return; // Prevent sending an empty request
      }
        
    const userMessage = { text: userInput, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    try {
        const response = await axios.post('http://localhost:4224/api/chatbot', {
            sessionId: 'some_unique_session_id',
        queryInput: {
            text: {
                text: userInput,
                languageCode: 'en',
            },
        },
    });
    console.log('Dialogflow response:', response.data);
    
    const botMessage = {
        text: response.data.fulfillmentText,
        sender: 'bot',
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
} catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error communicating with the chatbot.', sender: 'bot' },
    ]);
}
setUserInput('');
  };

  return (
    <div style={{ width: '400px', border: '1px solid #ccc', padding: '10px' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.sender === 'user' ? "bg-blue-400" : "bg-white"} `} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type a message..."
        style={{ width: '80%' }}
      />
      <button onClick={handleSendMessage} style={{ width: '18%' }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
