import React from 'react';
import { FinancialHealthAnalysis, Language } from '../types';
import { UI_STRINGS } from '../constants';
import { RevenueTrendChart, ProfitLossChart } from '../components/Charts';

interface DashboardProps {
  analysis: FinancialHealthAnalysis | null;
  language: Language;
  onUploadClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, language, onUploadClick }) => {
  const strings = UI_STRINGS[language];

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500 text-3xl">
             <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{strings.welcome}</h2>
          <p className="text-slate-500 mb-8">Start by uploading your financial documents or entering your data to get AI-powered insights.</p>
          <button 
            onClick={onUploadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
          >
            {strings.upload}
          </button>
        </div>
      </div>
    );
  }

  const { healthScore, metrics, trendData, summary } = analysis;

  // Determine health color
  const scoreColor = healthScore > 75 ? 'text-green-500' : healthScore > 50 ? 'text-yellow-500' : 'text-red-500';
  const scoreBg = healthScore > 75 ? 'bg-green-50' : healthScore > 50 ? 'bg-yellow-50' : 'bg-red-50';

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Health Score */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center justify-between col-span-1 md:col-span-2 relative overflow-hidden">
           <div className="z-10">
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">{strings.healthScore}</h3>
              <div className="flex items-baseline gap-2">
                 <span className={`text-5xl font-bold ${scoreColor}`}>{healthScore}</span>
                 <span className="text-slate-400 text-sm">/ 100</span>
              </div>
              <p className="text-sm text-slate-500 mt-2 max-w-xs">{summary}</p>
           </div>
           <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full ${scoreBg} opacity-50`}></div>
           <div className="z-10 w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center bg-white shadow-sm">
              <i className={`fa-solid fa-heart-pulse text-2xl ${scoreColor}`}></i>
           </div>
        </div>

        {/* Quick Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center">
           <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Gross Margin</h3>
           <span className="text-3xl font-bold text-slate-800">{metrics.grossMargin}</span>
           <span className="text-xs text-green-500 mt-1 flex items-center gap-1">
             <i className="fa-solid fa-arrow-trend-up"></i> Industry Avg: 18%
           </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center">
           <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Net Profit</h3>
           <span className="text-3xl font-bold text-slate-800">{metrics.netProfitMargin}</span>
           <span className="text-xs text-green-500 mt-1 flex items-center gap-1">
             <i className="fa-solid fa-check"></i> Healthy
           </span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">{strings.revenue} Trend</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">View Report</button>
          </div>
          <RevenueTrendChart data={trendData} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">{strings.revenue} vs {strings.expenses}</h3>
             <select className="bg-slate-50 border-none text-sm text-slate-600 rounded-lg py-1 px-2 focus:ring-0 cursor-pointer">
               <option>Last 12 Months</option>
               <option>YTD</option>
             </select>
          </div>
          <ProfitLossChart data={trendData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;