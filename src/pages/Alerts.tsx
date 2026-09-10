import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, Waves, ThermometerSun, Wind, ArrowRight, Shield, Bell, CheckCircle2 } from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  level: string;
  color: string;
  location: string;
  impact: string;
  action: string;
  time: string;
  affectedCount?: number;
}

export default function Alerts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
        if (data.alerts) setAlerts(data.alerts);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-red-500" />
            Alerts & Notifications
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stay informed about the latest disaster alerts and advisories.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'active'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Alert History
          </button>
        </div>
      </div>

      {/* Alerts List matching reference design */}
      <div className="space-y-4">
        {activeTab === 'active' ? (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl p-6 border transition-all ${
                alert.level === 'CRITICAL'
                  ? 'bg-red-950/20 border-red-500/40 shadow-lg shadow-red-950/30'
                  : alert.level === 'HIGH'
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      alert.level === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : alert.level === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    <AlertTriangle className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-black text-white tracking-wide">{alert.title}</h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          alert.level === 'CRITICAL'
                            ? 'bg-red-500 text-white'
                            : alert.level === 'HIGH'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {alert.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">{alert.impact}</p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {alert.location}
                      </span>
                      <span>•</span>
                      <span>Issued: {alert.time}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons matching reference design */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => navigate('/evacuation')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <span>View Safe Route</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate('/map')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all text-center"
                  >
                    Find Shelter
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-400 text-sm">
            No archived alert history available for this session.
          </div>
        )}
      </div>
    </div>
  );
}
