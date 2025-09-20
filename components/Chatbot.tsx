import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/geminiChatService';
// FIX: Added .ts extension to type import to resolve module not found error.
import type { ChatMessage } from '../types';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Add a placeholder for the model's response
    setMessages((prev) => [...prev, { role: 'model', content: '' }]);

    try {
      const responseStream = await sendMessage(input);
      let fullResponse = '';
      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: fullResponse };
          return newMessages;
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessages((prev) => {
         const newMessages = [...prev];
         newMessages[newMessages.length - 1] = { role: 'model', content: `Error: ${errorMessage}`};
         return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-15rem)]">
        <div className="text-center mb-6">
             <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">AI Safety Assistant</h2>
             <p className="mt-2 text-lg text-slate-400">Ask me anything about travel safety.</p>
        </div>

      <div className="flex-grow overflow-y-auto pr-2 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 flex-shrink-0 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-5 h-5" />
              </div>
            )}
            <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.content || '...'}</p>
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 flex-shrink-0 bg-slate-600 text-slate-300 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
         <div ref={messagesEndRef} />
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-full p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Ask for safety tips..."
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none px-4"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-cyan-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 hover:bg-cyan-500 disabled:bg-slate-600 transition-colors"
            aria-label="Send message"
          >
           {isLoading ? 
            <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> :
            <PaperAirplaneIcon className="w-5 h-5" />
           }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;