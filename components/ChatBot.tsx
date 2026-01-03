
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Info } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am Ward Mitra, your AI assistant for Ward 17 Bengapadavu. How can I help you today? You can ask me about government schemes, ward meetings, or how to reach the ward member.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getGeminiResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-180px)] md:h-[calc(100vh-100px)] flex flex-col space-y-4">
      <header className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Ward Mitra AI</h2>
            <p className="text-gray-500 text-sm">AI Assistant for Bengapadavu Residents</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            AI Online
        </div>
      </header>

      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot size={16} className="text-gray-400" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                <Loader2 size={20} className="animate-spin text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me something about ward 17..."
              className="w-full py-4 pl-5 pr-14 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${
                input.trim() ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest px-1">
             <Info size={12} />
             Powered by Gemini AI for community service
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
