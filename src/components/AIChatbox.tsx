import React from "react";
import { useTheme } from "next-themes";

interface AIChatboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbox: React.FC<AIChatboxProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

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
        <button onClick={onClose} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
          Close
        </button>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4 overflow-y-auto">{/* Chat messages will go here */}</div>
        <div className="p-4 border-t border-gray-200 ">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300 text-black"
              placeholder="Type your message..."
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
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
