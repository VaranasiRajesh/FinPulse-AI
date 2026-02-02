import React, { useState } from 'react';
import { FinancialHealthAnalysis, Language } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Advisor from './pages/Advisor';
import FileUpload from './components/FileUpload';
import { analyzeFinancials } from './services/geminiService';
import { UI_STRINGS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [analysisData, setAnalysisData] = useState<FinancialHealthAnalysis | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSubmit = async (text: string, industry: string) => {
    setIsUploadOpen(false);
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeFinancials(text, industry, language);
      setAnalysisData(result);
      setActiveTab('dashboard');
    } catch (err) {
      console.error(err);
      setError("Failed to analyze data. Please try again or check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    if (isAnalyzing) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
           <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
           <h2 className="text-xl font-semibold text-slate-800 animate-pulse">{UI_STRINGS[language].analyzing}</h2>
           <p className="text-slate-500 mt-2">Connecting to Gemini AI Engine...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
           <div className="text-red-500 text-5xl mb-4"><i className="fa-solid fa-circle-exclamation"></i></div>
           <h2 className="text-xl font-semibold text-slate-800">Error</h2>
           <p className="text-slate-500 mt-2">{error}</p>
           <button 
             onClick={() => setError(null)}
             className="mt-6 px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
           >
             Go Back
           </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard analysis={analysisData} language={language} onUploadClick={() => setIsUploadOpen(true)} />;
      case 'analysis':
        return <Analysis analysis={analysisData} language={language} />;
      case 'advisor':
        return <Advisor analysis={analysisData} language={language} />;
      default:
        return <div className="p-8 text-center text-slate-500">Settings module coming soon.</div>;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar currentTab={activeTab} setTab={setActiveTab} language={language} />
      
      <div className="flex-1 ml-64 flex flex-col">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          title={UI_STRINGS[language][activeTab as keyof typeof UI_STRINGS['en']] || 'FinPulse AI'} 
        />
        
        <main className="flex-1 overflow-auto relative">
          {renderContent()}
        </main>
      </div>

      <FileUpload 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onSubmit={handleUploadSubmit} 
        language={language}
      />
    </div>
  );
};

export default App;