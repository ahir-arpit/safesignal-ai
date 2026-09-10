import React, { useState } from 'react';
import { AlertTriangle, MapPin, Phone, Users, ShieldAlert, CheckCircle2, Clock, Flame, Waves, Stethoscope, HelpCircle, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function EmergencySOS() {
  const { sosActive, setSosActive, activeSOS, setActiveSOS } = useAppContext();
  const [emergencyType, setEmergencyType] = useState('Flood');
  const [peopleCount, setPeopleCount] = useState(1);
  const [info, setInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { name: 'Flood', icon: Waves },
    { name: 'Medical', icon: Stethoscope },
    { name: 'Trapped', icon: ShieldAlert },
    { name: 'Fire', icon: Flame },
    { name: 'Other', icon: HelpCircle },
  ];

  const handleSendSOS = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: emergencyType,
          peopleCount,
          info,
          location: { lat: 28.6692, lng: 77.4538, name: "Ghaziabad, Sector 4" }
        })
      });
      const data = await res.json();
      if (data.sos) {
        setActiveSOS(data.sos);
        setSosActive(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Emergency / SOS
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Instant emergency broadcast & GPS rescue dispatch system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left SOS Control Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* Giant Pulsing Crimson SOS Button */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
            <button
              onClick={handleSendSOS}
              disabled={isSubmitting || sosActive}
              className={`w-full py-8 rounded-2xl font-black text-2xl tracking-widest text-white transition-all shadow-2xl flex flex-col items-center justify-center gap-2 ${
                sosActive
                  ? 'bg-red-700 cursor-not-allowed shadow-red-700/50'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-600/40 hover:scale-[1.01] active:scale-[0.99] animate-pulse'
              }`}
            >
              <AlertTriangle className="w-10 h-10" />
              <span>{sosActive ? 'SOS BROADCAST ACTIVE' : 'SEND SOS'}</span>
              <span className="text-xs font-normal opacity-80">Your GPS location will be shared with rescue teams</span>
            </button>
          </div>

          {/* Form Options */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-6">
            {/* Category Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Emergency Type</label>
              <div className="grid grid-cols-5 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const selected = emergencyType === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setEmergencyType(cat.name)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        selected
                          ? 'bg-red-500/20 border-red-500 text-red-400 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px]">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* People Count Counter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Number of People</label>
              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-2 w-fit">
                <button
                  type="button"
                  onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold text-white px-4">{peopleCount}</span>
                <button
                  type="button"
                  onClick={() => setPeopleCount(peopleCount + 1)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Additional Info Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Additional Info (Optional)</label>
              <textarea
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                rows={3}
                placeholder="e.g. Injured persons, special medical assistance required..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={handleSendSOS}
              disabled={isSubmitting || sosActive}
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs text-white transition-all shadow-lg shadow-red-600/30"
            >
              Send Emergency Request
            </button>
          </div>
        </div>

        {/* Right Live Tracker & Map Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Location Badge */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                Your Location
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                + GPS Active
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              Lat: 28.6692 | Lng: 77.4538 (Ghaziabad)
            </div>
          </div>

          {/* Live SOS Timeline Status */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">
              SOS Dispatch Status
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-white">Request Sent</div>
                  <div className="text-[10px] text-slate-400">Emergency signal broadcast to central dispatch</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  sosActive ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-slate-800 text-slate-500'
                }`}>
                  2
                </div>
                <div>
                  <div className="font-bold text-white">Rescue Team Notified</div>
                  <div className="text-[10px] text-slate-400">Nearest team assigned: Team Delta (1.2 km away)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <div className="font-bold text-white">In Progress</div>
                  <div className="text-[10px] text-slate-400">En route to your location</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
