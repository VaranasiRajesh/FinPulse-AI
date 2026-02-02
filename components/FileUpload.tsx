import React, { useState } from 'react';
import { Industry, Language } from '../types';
import { INDUSTRIES, UI_STRINGS, MOCK_FINANCIAL_TEXT } from '../constants';

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string, industry: string) => void;
  language: Language;
}

const FileUpload: React.FC<FileUploadProps> = ({ isOpen, onClose, onSubmit, language }) => {
  const [text, setText] = useState('');
  const [industry, setIndustry] = useState<string>(INDUSTRIES[0]);
  const strings = UI_STRINGS[language];

  if (!isOpen) return null;

  const handleDemoData = () => {
    setText(MOCK_FINANCIAL_TEXT.trim());
    setIndustry(Industry.RETAIL);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">{strings.upload}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">{strings.selectIndustry}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                    industry === ind
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">{strings.uploadPrompt}</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
               <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-400 mb-3 group-hover:text-blue-500 transition-colors"></i>
               <p className="text-sm text-slate-500">Drag & drop files here or click to browse</p>
               <p className="text-xs text-slate-400 mt-1">Supports PDF, XLSX, CSV</p>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
             </div>
             <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or</span>
             </div>
          </div>

          <div className="mt-6">
             <label className="block text-sm font-medium text-slate-700 mb-2">{strings.orPaste}</label>
             <textarea
               className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-mono text-slate-600"
               placeholder="Paste raw financial text here..."
               value={text}
               onChange={(e) => setText(e.target.value)}
             ></textarea>
          </div>
          
          <div className="mt-2 flex justify-end">
             <button onClick={handleDemoData} className="text-sm text-blue-600 hover:underline">
               {strings.demoData}
             </button>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSubmit(text, industry)}
            disabled={!text}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none"
          >
            Analyze Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;