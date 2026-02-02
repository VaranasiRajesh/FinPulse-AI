import React, { useState, useRef, useEffect } from 'react';
import { FinancialHealthAnalysis, Language, ChatMessage } from '../types';
import { UI_STRINGS } from '../constants';
import { chatWithAdvisor } from '../services/geminiService';

interface AdvisorProps {
  analysis: FinancialHealthAnalysis | null;
  language: Language;
}

const Advisor: React.FC<AdvisorProps> = ({ analysis, language }) => {
  const strings = UI_STRINGS[language];
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: language === Language.ENGLISH 
        ? "Hello! I am your AI Financial Advisor. I have analyzed your data. How can I help you improve your business health today?"
        : "नमस्ते! मैं आपका AI वित्तीय सलाहकार हूं। मैंने आपके डेटा का विश्लेषण किया है। आज मैं आपके व्यवसाय को बेहतर बनाने में कैसे मदद कर सकता हूँ?",
      timestamp: new Date()
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Context data from analysis
      const context = analysis ? JSON.stringify(analysis) : "No specific financial data uploaded yet. Answer general questions.";

      const responseText = await chatWithAdvisor(history, userMsg.text, context);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error connecting to the service.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`flex max-w-2xl gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  <i className={`fa-solid ${msg.role === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
             </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start">
             <div className="flex max-w-2xl gap-3">
               <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <i className="fa-solid fa-robot"></i>
               </div>
               <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
           </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your cash flow, expenses, or loan eligibility..."
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400 shadow-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-3 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          AI Advice can be inaccurate. Always consult a professional accountant for tax filing.
        </p>
      </div>
    </div>
  );
};

export default Advisor;