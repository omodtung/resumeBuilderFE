import React, { useState } from "react";
import { useTheme } from "next-themes";

interface AIChatboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbox: React.FC<AIChatboxProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = { text: message, sender: "user" } as const;
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = { text: data.text, sender: "bot" } as const;
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = { text: "Error: Could not get a response from the AI.", sender: "bot" } as const;
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 h-96 w-80 ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } rounded-md shadow-lg transition-transform duration-300 transform ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Chatbox</h2>
        <button onClick={onClose} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none text-black">
          Close
        </button>
      </div>
      <div className="flex flex-col h-full">
        <div className="h-64 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-md ${
                msg.sender === "user" ? "bg-blue-200 self-end text-black" : "bg-gray-200 self-start text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="mb-2 p-2 bg-gray-200 rounded-md self-start text-black">
              Typing...
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 ">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              className={`flex-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 ${theme === "dark" ? "text-white" : "text-black"}`}
              placeholder=" Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbox;
