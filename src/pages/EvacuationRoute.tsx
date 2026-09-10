import React, { useState } from 'react';
import { Navigation, MapPin, ShieldCheck, AlertTriangle, ArrowRight, Clock, Ruler } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function EvacuationRoute() {
  const [origin, setOrigin] = useState('Current Location (Sector 4)');
  const [destination, setDestination] = useState('Community Relief Shelter #1');
  const [routeData, setRouteData] = useState({
    distanceKm: 3.2,
    estimatedMinutes: 12,
    riskLevel: 'Low',
    waypoints: [
      [28.6692, 77.4538],
      [28.6710, 77.4500],
      [28.6730, 77.4450],
      [28.6550, 77.4400]
    ] as [number, number][]
  });

  const handleCalculateRoute = async () => {
    try {
      const res = await fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination })
      });
      const data = await res.json();
      if (data.distanceKm) {
        setRouteData({
          distanceKm: data.distanceKm,
          estimatedMinutes: data.estimatedMinutes,
          riskLevel: data.riskLevel,
          waypoints: data.waypoints.map((w: any) => [w.lat, w.lng])
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Navigation className="w-6 h-6 text-blue-400" />
          Evacuation Route Planner
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Find the safest route to the nearest relief shelter avoiding active hazard zones.
        </p>
      </div>

      {/* Input Form Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Your Location</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Destination Shelter</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleCalculateRoute}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all shrink-0"
        >
          Find Safe Route
        </button>
      </div>

      {/* Map & Stats Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
        {/* Recommended Route Specs Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
              Recommended Route Specs
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Total Distance</div>
                    <div className="text-lg font-black text-white">{routeData.distanceKm} km</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Estimated Travel Time</div>
                    <div className="text-lg font-black text-white">{routeData.estimatedMinutes} min</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Risk Level</div>
                    <div className="text-sm font-bold text-emerald-400">{routeData.riskLevel} (Cleared)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-4 h-1 bg-blue-500 rounded"></span>
                <span>Safe Evacuation Route</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500"></span>
                <span>Hazard / Danger Zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
          <MapContainer center={[28.6692, 77.4538]} zoom={13} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />

            {/* Danger Zone Circle */}
            <Circle
              center={[28.6750, 77.4600]}
              pathOptions={{ fillColor: '#EF4444', color: '#DC2626', fillOpacity: 0.3 }}
              radius={1400}
            />

            {/* Polyline Route */}
            <Polyline positions={routeData.waypoints} pathOptions={{ color: '#3B82F6', weight: 5 }} />

            {/* Origin Marker */}
            <Marker position={routeData.waypoints[0]}>
              <Popup>Origin: {origin}</Popup>
            </Marker>

            {/* Destination Shelter Marker */}
            <Marker position={routeData.waypoints[routeData.waypoints.length - 1]}>
              <Popup>Destination: {destination}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
