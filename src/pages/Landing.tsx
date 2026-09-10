import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Activity,
  Users,
  AlertTriangle,
  ArrowRight,
  Phone,
  MapPin,
  HeartPulse,
  Building2,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { weather } = useAppContext();
  const [stats, setStats] = useState({
    activeAlerts: 12,
    activeIncidents: 5,
    peopleAffected: 8420
  });

  useEffect(() => {
    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
        if (data.activeAlertsCount) {
          setStats({
            activeAlerts: data.activeAlertsCount,
            activeIncidents: data.activeIncidentsCount,
            peopleAffected: data.peopleAffected
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Header Card with Background Overlay */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-[#0B172E] via-[#0F2042] to-[#0A1124] p-8 md:p-12 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-indigo-600 to-transparent"></div>
        
        <div className="max-w-2xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Risk Intelligence Active</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Smarter Decisions. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Safer Communities.
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            An AI-powered disaster management platform to predict risks, coordinate responses, and build a more resilient tomorrow.
          </p>

          {/* Action Buttons matching reference design */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => navigate('/map')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Check Risk In My Area</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/emergency')}
              className="px-6 py-3.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Emergency</span>
            </button>

            <button
              onClick={() => navigate('/alerts')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs tracking-wide transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Emergency Contacts</span>
            </button>
          </div>
        </div>

        {/* Live Counters Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{stats.activeAlerts}</div>
              <div className="text-xs text-slate-400 font-medium">Live Alerts</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{stats.activeIncidents}</div>
              <div className="text-xs text-slate-400 font-medium">Active Incidents</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{stats.peopleAffected.toLocaleString()}</div>
              <div className="text-xs text-slate-400 font-medium">People Affected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/map')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer group space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">GIS Risk Mapping</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real-time disaster risk maps, flooded zones, open shelters, and safe evacuation paths overlaid on interactive Leaflet maps.
          </p>
        </div>

        <div
          onClick={() => navigate('/ai-priority')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer group space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Rescue Priority</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automated priority scoring for emergency requests using Gemini 2.5 AI model to dispatch rescue teams where needed most.
          </p>
        </div>

        <div
          onClick={() => navigate('/resources')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:-translate-y-1 cursor-pointer group space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Resource Management</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Track available hospital beds, ICU units, medical inventory, relief center capacities, and field deployment teams in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
