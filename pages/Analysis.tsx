import React from 'react';
import { FinancialHealthAnalysis, Language } from '../types';
import { UI_STRINGS } from '../constants';
import { ForecastChart } from '../components/Charts';

interface AnalysisProps {
  analysis: FinancialHealthAnalysis | null;
  language: Language;
}

const Analysis: React.FC<AnalysisProps> = ({ analysis, language }) => {
  const strings = UI_STRINGS[language];

  if (!analysis) return null;

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">{strings.analysis} & Predictions</h2>
           <p className="text-slate-500">Deep dive into risks, opportunities, and future projections.</p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm flex items-center gap-2">
          <i className="fa-solid fa-file-pdf text-red-500"></i> Export PDF
        </button>
      </div>

      {/* Forecast Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-2">{strings.forecast}</h3>
        <p className="text-sm text-slate-500 mb-6">AI-generated projection based on current growth trajectory and seasonal patterns.</p>
        <ForecastChart data={analysis.forecastData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risks */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-amber-500"></i> {strings.risks}
          </h3>
          {analysis.risks.map((risk, idx) => (
            <div key={idx} className="bg-white border-l-4 border-amber-500 rounded-r-lg shadow-sm p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-800">{risk.title}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                  risk.severity === 'high' ? 'bg-red-100 text-red-600' : 
                  risk.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {risk.severity}
                </span>
              </div>
              <p className="text-sm text-slate-600">{risk.description}</p>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <i className="fa-solid fa-lightbulb text-blue-500"></i> {strings.recommendations}
          </h3>
          {analysis.recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${
                  rec.category === 'cost' ? 'bg-red-500' : rec.category === 'revenue' ? 'bg-green-500' : 'bg-purple-500'
                }`}></span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{rec.category}</span>
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">{rec.title}</h4>
              <p className="text-sm text-slate-600 mb-3">{rec.action}</p>
              <button className="text-blue-600 text-sm font-medium hover:underline">Take Action &rarr;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis;