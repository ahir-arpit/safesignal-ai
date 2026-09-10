import React, { useState, useEffect } from 'react';
import { Box, HeartPulse, Building2, Users, Truck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Resources() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'all' | 'hospitals' | 'shelters' | 'teams'>('all');
  const [data, setData] = useState({
    hospitals: { total: 12, availableBeds: 482, totalBeds: 900, icuBeds: 38, doctors: 112 },
    shelters: { total: 18, availableCapacity: 2430, totalCapacity: 3200, currentOccupancy: 770, occupancyPercent: 24 },
    teams: { activeTeams: 18, pendingDispatches: 3, vehicleCount: 46 }
  });

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(d => {
        if (d.hospitals) setData(d);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Box className="w-6 h-6 text-cyan-400" />
            Resource Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Availability of critical emergency resources, hospital beds, shelters, and rescue personnel.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          {(['all', 'hospitals', 'shelters', 'teams'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hospitals Stats Section */}
      {(activeCategory === 'all' || activeCategory === 'hospitals') && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-red-400" />
              Hospitals & Medical Centers
            </h3>
            <button
              onClick={() => navigate('/emergency')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              Request Ambulance →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Hospitals</div>
              <div className="text-3xl font-black text-white">{data.hospitals.total}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Available Beds</div>
              <div className="text-3xl font-black text-emerald-400">
                {data.hospitals.availableBeds} <span className="text-xs text-slate-500 font-normal">/ {data.hospitals.totalBeds}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">ICU Beds</div>
              <div className="text-3xl font-black text-blue-400">{data.hospitals.icuBeds}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">On-Duty Doctors</div>
              <div className="text-3xl font-black text-amber-400">{data.hospitals.doctors}</div>
            </div>
          </div>
        </div>
      )}

      {/* Shelters Stats Section */}
      {(activeCategory === 'all' || activeCategory === 'shelters') && (
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Relief Shelters
            </h3>
            <button
              onClick={() => navigate('/evacuation')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              Get Shelter Route →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Shelters</div>
              <div className="text-3xl font-black text-white">{data.shelters.total}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Available Capacity</div>
              <div className="text-3xl font-black text-emerald-400">
                {data.shelters.availableCapacity.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ {data.shelters.totalCapacity.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Current Occupancy</div>
              <div className="text-3xl font-black text-cyan-400">
                {data.shelters.currentOccupancy} <span className="text-xs text-slate-500 font-normal">({data.shelters.occupancyPercent}%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rescue Teams Stats Section */}
      {(activeCategory === 'all' || activeCategory === 'teams') && (
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              Rescue Teams & Fleet
            </h3>
            <button
              onClick={() => navigate('/ai-priority')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              View Dispatch Priority →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Active Rescue Teams</div>
              <div className="text-3xl font-black text-white">{data.teams.activeTeams}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pending Dispatches</div>
              <div className="text-3xl font-black text-amber-400">{data.teams.pendingDispatches}</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Rescue Vehicles</div>
              <div className="text-3xl font-black text-cyan-400">{data.teams.vehicleCount}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
