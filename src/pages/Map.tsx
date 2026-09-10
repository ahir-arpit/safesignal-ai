import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const { t } = useTranslation();
  const center: [number, number] = [26.8467, 80.9462]; // Lucknow coordinates

  return (
    <div className="flex-1 flex flex-col relative h-[calc(100vh-4rem)]">
      <div className="absolute top-4 left-4 z-[400] bg-white p-4 rounded-xl shadow-lg border border-slate-200 max-w-sm">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5" />
          Map Layers
        </h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-700">Flood Risk (Red)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-700">Safe Zones (Green)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-700">Shelters</span>
          </label>
        </div>
      </div>

      <MapContainer center={center} zoom={13} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Location */}
        <Marker position={center}>
          <Popup>
            <div className="font-semibold text-slate-800">Your Location</div>
            <div className="text-slate-600 text-sm">Lucknow, India</div>
          </Popup>
        </Marker>

        {/* Flood Risk Area */}
        <Circle center={[26.85, 80.95]} pathOptions={{ fillColor: 'red', color: 'red', fillOpacity: 0.2 }} radius={1000}>
          <Popup>
            <div className="font-bold text-red-600 mb-1">{t('FLOOD WARNING')}</div>
            <div className="text-sm text-slate-600">High Risk Zone</div>
          </Popup>
        </Circle>

        {/* Safe Zone */}
        <Circle center={[26.83, 80.93]} pathOptions={{ fillColor: 'green', color: 'green', fillOpacity: 0.2 }} radius={800}>
          <Popup>
            <div className="font-bold text-green-600 mb-1">Safe Zone</div>
            <div className="text-sm text-slate-600">Community Relief Center</div>
          </Popup>
        </Circle>

        <Marker position={[26.83, 80.93]}>
          <Popup>
            <div className="font-semibold text-slate-800">Community Relief Center</div>
            <div className="text-slate-600 text-sm">Capacity: 72%</div>
            <button className="mt-2 text-blue-600 font-semibold text-sm w-full text-left">Get Directions</button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
