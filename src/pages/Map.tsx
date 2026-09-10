import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Layers, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const navigate = useNavigate();
  const center: [number, number] = [28.6692, 77.4538];

  const [layers, setLayers] = useState({
    floodArea: true,
    shelters: true,
    hospitals: true,
    rescueTeams: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 h-[calc(100vh-7rem)] flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            Live Risk Map
          </h2>
          <p className="text-xs text-slate-400">
            Real-time disaster risk zones, affected areas, shelters and emergency rescue points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            High Risk Zone: Hindon Floodplain
          </span>
        </div>
      </div>

      {/* Map Container Wrapper */}
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        {/* Floating Info Overlay Card */}
        <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 rounded-2xl shadow-2xl max-w-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white">Ghaziabad</h3>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-extrabold border border-red-500/30">
              High Risk
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
              <div className="text-[10px] text-slate-400 font-medium">Population at Risk</div>
              <div className="text-sm font-extrabold text-white">24,500</div>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
              <div className="text-[10px] text-slate-400 font-medium">Nearest Shelter</div>
              <div className="text-sm font-extrabold text-emerald-400">1.8 km</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/evacuation')}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
          >
            Get Evacuation Route
          </button>
        </div>

        {/* Floating Map Layers Control */}
        <div className="absolute top-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 rounded-2xl shadow-2xl w-60 space-y-3">
          <h3 className="font-bold text-xs text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <Layers className="w-4 h-4 text-blue-400" />
            Map Layers Filter
          </h3>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer select-none text-slate-300 hover:text-white">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Disaster Affected Area
              </span>
              <input
                type="checkbox"
                checked={layers.floodArea}
                onChange={() => toggleLayer('floodArea')}
                className="rounded accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer select-none text-slate-300 hover:text-white">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Safe Shelters
              </span>
              <input
                type="checkbox"
                checked={layers.shelters}
                onChange={() => toggleLayer('shelters')}
                className="rounded accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer select-none text-slate-300 hover:text-white">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Hospitals & Medical
              </span>
              <input
                type="checkbox"
                checked={layers.hospitals}
                onChange={() => toggleLayer('hospitals')}
                className="rounded accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer select-none text-slate-300 hover:text-white">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Rescue Teams
              </span>
              <input
                type="checkbox"
                checked={layers.rescueTeams}
                onChange={() => toggleLayer('rescueTeams')}
                className="rounded accent-blue-600"
              />
            </label>
          </div>
        </div>

        {/* Leaflet Map Canvas */}
        <MapContainer center={center} zoom={13} className="w-full h-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* User Marker */}
          <Marker position={center}>
            <Popup>
              <div className="font-bold text-slate-900">Your Location</div>
              <div className="text-slate-600 text-xs">Sector 4, Ghaziabad</div>
            </Popup>
          </Marker>

          {/* Flood Risk Polygon / Circle */}
          {layers.floodArea && (
            <Circle
              center={[28.6750, 77.4600]}
              pathOptions={{ fillColor: '#EF4444', color: '#DC2626', fillOpacity: 0.35, weight: 2 }}
              radius={1800}
            >
              <Popup>
                <div className="font-bold text-red-600">CRITICAL FLOOD ZONE</div>
                <div className="text-xs text-slate-700">Water Level: 2.4m above safety mark</div>
              </Popup>
            </Circle>
          )}

          {/* Shelter Marker */}
          {layers.shelters && (
            <Marker position={[28.6550, 77.4400]}>
              <Popup>
                <div className="font-bold text-emerald-700">Community Relief Shelter #1</div>
                <div className="text-xs text-slate-600">Capacity: 2,430 / 3,200 (Occupancy 76%)</div>
                <div className="text-xs text-blue-600 font-bold mt-1">Available Beds: 770</div>
                <button
                  onClick={() => navigate('/evacuation')}
                  className="mt-2 text-xs font-bold bg-blue-600 text-white px-3 py-1 rounded-lg w-full"
                >
                  Navigate Here
                </button>
              </Popup>
            </Marker>
          )}

          {/* Hospital Marker */}
          {layers.hospitals && (
            <Marker position={[28.6620, 77.4580]}>
              <Popup>
                <div className="font-bold text-blue-700">City Emergency Hospital</div>
                <div className="text-xs text-slate-600">Available Beds: 482 | ICU Beds: 38</div>
                <div className="text-xs text-emerald-600 font-bold mt-1">Emergency Trauma Unit Open</div>
                <button
                  onClick={() => navigate('/resources')}
                  className="mt-2 text-xs font-bold bg-slate-800 text-white px-3 py-1 rounded-lg w-full"
                >
                  View Bed Stats
                </button>
              </Popup>
            </Marker>
          )}

          {/* Rescue Team Marker */}
          {layers.rescueTeams && (
            <Marker position={[28.6710, 77.4500]}>
              <Popup>
                <div className="font-bold text-amber-700">Rescue Team Delta</div>
                <div className="text-xs text-slate-600">Status: Active Search & Rescue</div>
                <div className="text-xs text-slate-800 font-bold mt-1">Personnel: 14</div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
