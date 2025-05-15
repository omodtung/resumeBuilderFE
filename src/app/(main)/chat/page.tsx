"use client";

import React, { useState } from 'react';
import { useTheme } from "next-themes";

const ChatPage = () => {
  interface Message {
    text: string;
    sender: string;
    isFile?: boolean;
    isImage?: boolean;
  }
  const [messages, setMessages] = useState<Message[]>([
    { text: "Tôi sẽ giúp bạn tìm kiếm các công ty có tên chứa ký tự 'GG' trong dữ liệu đã cung cấp. Sau khi kiểm tra, tôi thấy rằng có một công ty có tên chứa ký tự 'GG' là: * Lazada Việt Nam (ID: 4) Vậy là kết quả tìm kiếm của tôi cho câu hỏi này là chỉ có một công ty có tên chứa ký tự 'GG'.", sender: "ai" },
    { text: "Hãy tìm kiếm giúp tôi các công ty có tên chứa ký tự GG", sender: "user" },
    { text: "Có thể liệt kê tên các công ty trong hệ thống của bạn được không ?", sender: "user" },
    { text: "Có, dưới đây là danh sách các công ty đã được liệt kê trong hệ thống: 1. Amazon.com, Inc. 2. Apple Inc. 3. Google LLC 4. Lazada Việt Nam 5. Netflix Inc (đã được cập nhật) 6. Adobe Photoshop 7. Táºp Ä'oÃ n Adobe 8. Shopee 9. Tiki 10. Tiktok ", sender: "ai" },
  ]);
  const [input, setInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const { theme } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '' || uploadedFile) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages); // Immediately set the user's message
      setInput('');
      setIsWaitingForResponse(true); // Disable input and upload

      if (uploadedFile) {
        const fileType = uploadedFile.type;
        const isImage = fileType.startsWith('image/');
        const fileMessage = {
          text: isImage ? URL.createObjectURL(uploadedFile) : `Uploaded file: ${uploadedFile.name}`,
          sender: 'user',
          isFile: true,
          isImage,
        };

        setMessages((prevMessages) => [...prevMessages, fileMessage]); // Add file/image to messages immediately
        setUploadedFile(null);

        const token = sessionStorage.getItem('token'); // Get token from session storage
        if (!token) {
          console.error("No token found in session storage.");
          setIsWaitingForResponse(false);
          return;
        }

        const formData = new FormData();
        formData.append('File', uploadedFile);

        try {
          const response = await fetch('http://localhost:8080/file-cv-send-ai', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (!response.ok) {
            console.error("Failed to send file:", response.statusText);
          }
        } catch (error) {
          console.error("Error sending file:", error);
        }
      }

      if (input.trim() !== '') {
        const userId = sessionStorage.getItem('userId'); // Get userId from session storage
        if (!userId) {
          console.error("No userId found in session storage.");
          setIsWaitingForResponse(false);
          return;
        }

        try {
          const response = await fetch('http://localhost:8080/api/agentAI/reviewCv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: input,
              userId: userId,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log("AI response:", result);

            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: result.response || "No response from AI.",
                sender: 'ai',
              },
            ]);
          } else {
            console.error("Failed to send message:", response.statusText);
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }

      setIsWaitingForResponse(false); // Re-enable input and upload
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log("Uploaded file:", file.name);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Reset the file input value
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-xl font-semibold">Chat With AI (Admin)</h1>
      </header>
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((message, index) => {
          return (
            <div key={index} className={`mb-2 flex text-black ${message.sender === 'user' ? 'justify-end text-right left-30 pl-60' : 'justify-start right-30 pr-60'}`}>
              <div className={`rounded-xl px-4 py-2 text-black ${message.sender === 'user' ? 'bg-blue-200' : 'bg-green-200'}`} style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                {message.isImage ? (
                  <img
                    src={message.text}
                    alt="Uploaded file"
                    className="rounded-xl max-w-xs max-h-60"
                  />
                ) : message.isFile ? (
                  <div className="border border-black rounded-md p-2">{message.text}</div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        {uploadedFile && (
          <div className="flex items-center mb-2 bg-gray-100 p-2 rounded-md">
            <span className="flex-1 text-gray-700">{uploadedFile.name}</span>
            <button
              className="text-red-500 hover:text-red-700 font-bold ml-2"
              onClick={handleRemoveFile}
            >
              X
            </button>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="text"
            className={`flex-1 border rounded-l-md py-2 px-3 focus:outline-none ${theme === 'dark' ? 'text-white bg-gray-800' : 'text-gray-700'}`}
            placeholder="Message"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isWaitingForResponse) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isWaitingForResponse}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
            onClick={handleSendMessage}
            disabled={isWaitingForResponse}
          >
            Gửi
          </button>
          <label className={`ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md cursor-pointer ${isWaitingForResponse ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isWaitingForResponse}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
