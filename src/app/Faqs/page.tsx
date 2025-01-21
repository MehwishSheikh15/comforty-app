

"use client"; 
import React, { useState } from "react";

const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const generateAnswer = (index: number) => {
    const answers = [
      "We offer a wide variety of chairs, including sofas, armchairs, wing chairs, desk chairs, wooden chairs, and park benches. Each chair is designed for comfort and style.",
      "You can reach us through our contact form on the website, email us at support@comforty.com, or call us at (123) 456-7890.",
      "Yes, all our chairs come with a 1-year warranty covering manufacturing defects.",
      "We aim to deliver your chair within 5-7 business days. You'll receive a tracking number once your order is shipped.",
      "Yes, we have a showroom where you can try out our chairs before making a purchase. Visit our website for the nearest location.",
      "To clean your Comforty chair, use a damp cloth with mild soap for regular cleaning. For fabric chairs, vacuum regularly to remove dust."
    ];
    return answers[index] || "Answer not available.";
  };

  const handleChatSubmit = () => {
    if (chatInput.trim() === "") return;

    const botReply = generateChatbotResponse(chatInput);
    setChatHistory([...chatHistory, { user: chatInput, bot: botReply }]);
    setChatInput("");
  };

  const generateChatbotResponse = (input: string) => {
    if (input.toLowerCase().includes("warranty")) {
      return "Yes, all our chairs come with a 1-year warranty.";
    } else if (input.toLowerCase().includes("delivery")) {
      return "We aim to deliver your chair within 5-7 business days.";
    } else {
      return "I'm here to help! Can you please provide more details about your question?";
    }
  };

  const recommendedQuestions = [
    "What types of chairs do you offer?",
    "Do your chairs come with a warranty?",
    "How do I clean and maintain my Comforty chair?",
  ];

  return (
    <div className="relative max-w-5xl mx-auto py-10 px-4 bg-gradient-to-r bg-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-6">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-black mb-12">
        Here are some of the most common questions we get about our chairs. If you need more information, feel free to contact us!
      </p>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {["What types of chairs do you offer?",
          "How can we get in touch with you?",
          "Do your chairs come with a warranty?",
          "What will be delivered? And When?",
          "Can I try a chair before purchasing?",
          "How do I clean and maintain my Comforty chair?",
        ].map((question, index) => (
          <div
            key={index}
            className="border bg-white rounded-lg shadow-lg p-5 transition-all duration-300 hover:scale-105"
          >
            <h2
              className="text-lg font-medium flex justify-between items-center cursor-pointer text-gray-800"
              onClick={() => toggleAnswer(index)}
            >
              {question}
              <span className="text-gray-400 text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </h2>
            <div
              className={`$${
                openIndex === index ? "max-h-[1000px]" : "max-h-0"
              } overflow-hidden transition-all duration-500 ease-in-out`}
            >
              {openIndex === index && (
                <p className="text-sm text-gray-600 mt-4">
                  {generateAnswer(index)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chatbot Toggle Button */}
      <button
        className="fixed bottom-4 right-4 bg-teal-500 text-white p-3 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none"
        onClick={() => setIsChatOpen(true)}
      >
        💬
      </button>

      {/* Chatbot Interface */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white border rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center bg-teal-500 text-white p-3 rounded-t-lg">
            <h2 className="text-lg font-bold">Chat with Us</h2>
            <button
              className="text-white text-xl font-bold focus:outline-none"
              onClick={() => setIsChatOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 bg-gray-100" style={{ maxHeight: "200px" }}>
            {chatHistory.map((chat, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-end mb-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-800 bg-teal-100 p-2 rounded-lg">{chat.user}</p>
                    <span className="bg-teal-500 text-white rounded-full p-2 text-xs">User</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-300 text-black rounded-full p-2 text-xs">Chatbot</span>
                    <p className="text-sm text-gray-600 bg-gray-200 p-2 rounded-lg">{chat.bot}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-white">
            <input
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none"
              placeholder="Type your question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              className="w-full bg-teal-500 text-white mt-2 p-2 rounded-lg hover:bg-teal-600"
              onClick={handleChatSubmit}
            >
              Send
            </button>
          </div>
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600">Recommended Questions:</p>
            <ul className="mt-2 space-y-1">
              {recommendedQuestions.map((question, index) => (
                <li
                  key={index}
                  className="text-teal-500 text-sm cursor-pointer hover:underline"
                  onClick={() => {
                    setChatInput(question);
                    handleChatSubmit();
                  }}
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
