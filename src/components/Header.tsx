import React, { useState } from 'react';
import { Search, CloudSun, Bell, ShieldCheck, AlertCircle, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { weather, alertsCount, role } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/map?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-[#090F1E]/90 border-b border-slate-800/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location, shelter, or risk zone..."
          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </form>

      {/* Right Controls & Widgets */}
      <div className="flex items-center gap-4">
        {/* Public & Govt Use Portal Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Public & Govt Dual Portal</span>
        </div>

        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>System Operational</span>
        </div>

        {/* Live Weather Widget */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>{weather?.location || 'Ghaziabad'}</span>
          <span className="font-bold text-white">{weather?.temp || 26}°C</span>
          <span className="text-[10px] text-slate-400 hidden lg:inline">({weather?.condition})</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Active Alerts"
        >
          <Bell className="w-4 h-4" />
          {alertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse">
              {alertsCount}
            </span>
          )}
        </button>

        {/* Role Pill */}
        <div className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
          {role}
        </div>
      </div>
    </header>
  );
}
