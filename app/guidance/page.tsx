'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import axios from 'axios';

// Define the structure for a single message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GuidancePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Send the entire conversation history to the backend
      const response = await axios.post('http://localhost:5001/api/chat', {
        messages: newMessages,
      });

      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.reply,
      };
      setMessages([...newMessages, aiMessage]);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to get a response. Please try again.';
      setError(errorMessage);
       // Revert messages if the API call fails
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 pt-25">
      <header className="bg-white border p-4 text-center pt-5">
        <h1 className="text-2xl font-bold text-gray-800">LegalDoc Guidance</h1>
        <p className="text-sm text-gray-500 font-serif">Ask for general legal information and guidance</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border rounded-bl-none'
              }`}
            >
              {/* Simple content display */}
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-3 rounded-2xl bg-white text-gray-800 border rounded-bl-none">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </main>
        
      {error && (
        <div className="px-4 pb-2">
          <p className="text-center text-red-500 bg-red-100 p-2 rounded-md">{error}</p>
        </div>
      )}

      <footer className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about a legal topic..."
            className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default GuidancePage;
