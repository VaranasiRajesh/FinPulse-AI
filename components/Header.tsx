import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, title }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <i className="fa-solid fa-bell text-slate-400 text-lg hover:text-slate-600 cursor-pointer"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        
        <div className="h-6 w-px bg-slate-300 mx-2"></div>

        <div className="flex bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setLanguage(Language.ENGLISH)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              language === Language.ENGLISH ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage(Language.HINDI)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              language === Language.HINDI ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            हिंदी
          </button>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
            JS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;