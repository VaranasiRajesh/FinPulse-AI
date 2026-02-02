import React from 'react';
import { UI_STRINGS, APP_NAME } from '../constants';
import { Language } from '../types';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setTab, language }) => {
  const strings = UI_STRINGS[language];

  const menuItems = [
    { id: 'dashboard', label: strings.dashboard, icon: 'fa-chart-pie' },
    { id: 'analysis', label: strings.analysis, icon: 'fa-file-invoice-dollar' },
    { id: 'advisor', label: strings.advisor, icon: 'fa-robot' },
    { id: 'settings', label: strings.settings, icon: 'fa-cog' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-10">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
          <i className="fa-solid fa-chart-line"></i>
          {APP_NAME}
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Current Plan</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">SME Premium</span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;