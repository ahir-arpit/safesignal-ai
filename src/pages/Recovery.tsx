import React from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, AlertCircle, Building, Zap, Droplets, Truck } from 'lucide-react';

export default function Recovery() {
  const metrics = [
    { label: 'Infrastructure Damage Assessment', percent: 50, color: 'bg-amber-500' },
    { label: 'People Rescued & Relocated', percent: 90, color: 'bg-emerald-500' },
    { label: 'Relief Food & Medical Distributed', percent: 80, color: 'bg-blue-500' },
    { label: 'Overall Recovery Score', percent: 68, color: 'bg-indigo-500' },
  ];

  const damageReports = [
    { asset: 'Roads & Highways', damaged: '12 damaged', status: '80% Restored', icon: Truck },
    { asset: 'Bridges & Culverts', damaged: '47 damaged', status: '60% Inspected', icon: Building },
    { asset: 'Public Buildings', damaged: '3 damaged', status: '40% Safe', icon: ShieldCheck },
    { asset: 'Power Supply Lines', damaged: '6 affected', status: '70% Restored', icon: Zap },
    { asset: 'Water Supply Pipes', damaged: '3 affected', status: '50% Operational', icon: Droplets },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-emerald-400" />
          Post-Disaster Recovery
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Track infrastructure repair, relief material distribution, and community rehabilitation progress.
        </p>
      </div>

      {/* Progress Bars Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
          Rehabilitation & Repair Progress
        </h3>

        <div className="space-y-4">
          {metrics.map((m, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{m.label}</span>
                <span className="font-bold text-white">{m.percent}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Damage Breakdown Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 font-bold text-xs text-slate-300 uppercase tracking-wider">
          Damage Report Breakdown
        </div>

        <div className="divide-y divide-slate-800/80">
          {damageReports.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">{item.asset}</div>
                    <div className="text-[10px] text-red-400">{item.damaged}</div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
