import React from 'react';
import { BarChart3, TrendingUp, Users, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function Analytics() {
  const chartData = [
    { day: 'Aug 10', affected: 1200, rescued: 800 },
    { day: 'Aug 11', affected: 2400, rescued: 1900 },
    { day: 'Aug 12', affected: 4800, rescued: 3900 },
    { day: 'Aug 13', affected: 6500, rescued: 5100 },
    { day: 'Aug 14', affected: 7800, rescued: 6000 },
    { day: 'Aug 15', affected: 8420, rescued: 6230 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Disaster Analytics & Trends
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical trends, affected population metrics, and rescue operation performance statistics.
        </p>
      </div>

      {/* Metric Cards Banner matching reference screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">People Affected</div>
          <div className="text-3xl font-black text-white">8,420</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Successfully Rescued</div>
          <div className="text-3xl font-black text-emerald-400">6,230</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Active Incidents</div>
          <div className="text-3xl font-black text-amber-400">127</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Response Time</div>
          <div className="text-3xl font-black text-cyan-400">46 min</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white">Incident & Rescue Trend (Last 7 Days)</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span> Affected
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Rescued
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAffected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRescued" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }} />
              <Area type="monotone" dataKey="affected" stroke="#3B82F6" fillOpacity={1} fill="url(#colorAffected)" />
              <Area type="monotone" dataKey="rescued" stroke="#10B981" fillOpacity={1} fill="url(#colorRescued)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
