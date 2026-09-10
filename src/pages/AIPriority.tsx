import React, { useState } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';

interface PriorityItem {
  id: string;
  location: string;
  peopleCount: number;
  level: 'Critical' | 'High' | 'Medium' | 'Low';
  priorityScore: number;
  status: string;
  dispatched?: boolean;
}

export default function AIPriority() {
  const [incidents, setIncidents] = useState<PriorityItem[]>([
    { id: '1', location: 'Village A (River Bank)', peopleCount: 150, level: 'Critical', priorityScore: 94, status: 'Unassigned', dispatched: false },
    { id: '2', location: 'Area B (Residential Sector 4)', peopleCount: 42, level: 'High', priorityScore: 81, status: 'In Dispatch', dispatched: false },
    { id: '3', location: 'Area C (Commercial Belt)', peopleCount: 15, level: 'Medium', priorityScore: 62, status: 'Team En Route', dispatched: true },
    { id: '4', location: 'Area D (Suburbs North)', peopleCount: 5, level: 'Medium', priorityScore: 48, status: 'Assessed', dispatched: false },
    { id: '5', location: 'Area E (Highway Outskirts)', peopleCount: 2, level: 'Low', priorityScore: 32, status: 'Assessed', dispatched: false },
  ]);

  const handleDispatch = (id: string) => {
    setIncidents(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: 'Rescue Dispatched!', dispatched: true }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
          AI Priority Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          AI-generated rescue priority based on severity, headcount, vulnerability, and terrain risk.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Gemini 2.5 AI Real-Time Priority Scoring Engine</span>
          </div>
          <span className="text-[10px] text-slate-400">Auto-Refreshed: Just now</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {incidents.map((item) => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                  item.level === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                  item.level === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                }`}>
                  {item.priorityScore}%
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{item.location}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      item.level === 'Critical' ? 'bg-red-500 text-white' :
                      item.level === 'High' ? 'bg-amber-500 text-slate-950' :
                      'bg-blue-500 text-white'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {item.peopleCount} people trapped • Status: <span className={item.dispatched ? "text-emerald-400 font-bold" : "text-slate-200"}>{item.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-32 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800 hidden md:block">
                  <div
                    className={`h-full rounded-full ${
                      item.priorityScore > 80 ? 'bg-red-500' : item.priorityScore > 60 ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.priorityScore}%` }}
                  ></div>
                </div>

                <button
                  onClick={() => handleDispatch(item.id)}
                  disabled={item.dispatched}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    item.dispatched
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                      : item.level === 'Critical'
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {item.dispatched ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dispatched</span>
                    </>
                  ) : item.level === 'Critical' ? (
                    'Rescue Now'
                  ) : (
                    'Assign Team'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
