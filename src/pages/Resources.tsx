import React, { useState, useEffect } from 'react';
import { Box, HeartPulse, Building2, Users, Truck, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Resources() {
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
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Box className="w-6 h-6 text-cyan-400" />
          Resource Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Availability of critical emergency resources, hospital beds, shelters, and rescue personnel.
        </p>
      </div>

      {/* Hospitals Stats Section */}
      <div className="space-y-3">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-red-400" />
          Hospitals & Medical Centers
        </h3>

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

      {/* Shelters Stats Section */}
      <div className="space-y-3 pt-4">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-400" />
          Relief Shelters
        </h3>

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
    </div>
  );
}
