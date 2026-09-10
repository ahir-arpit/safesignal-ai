import { useTranslation } from 'react-i18next';
import { AlertTriangle, MapPin, ThermometerSun, Wind, Waves } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Alerts() {
  const { t } = useTranslation();

  const alerts = [
    {
      id: 1,
      type: 'Flood',
      title: 'CRITICAL FLOOD WARNING',
      level: 'CRITICAL',
      color: 'red',
      icon: Waves,
      location: 'River District',
      impact: 'Severe flooding possible.',
      action: 'Move to higher ground immediately.',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'Heat',
      title: 'EXTREME HEAT WARNING',
      level: 'HIGH',
      color: 'orange',
      icon: ThermometerSun,
      location: 'City Center',
      impact: 'Temperatures exceeding 42°C.',
      action: 'Stay indoors, hydrate properly.',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'Storm',
      title: 'SEVERE WEATHER ALERT',
      level: 'MODERATE',
      color: 'yellow',
      icon: Wind,
      location: 'Northern Suburbs',
      impact: 'High winds and heavy rain expected.',
      action: 'Secure loose objects outdoors.',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">{t('Active Alerts')}</h1>

      <div className="space-y-6">
        {alerts.map(alert => (
          <div key={alert.id} className={cn(
            "bg-white rounded-2xl shadow-sm border overflow-hidden",
            alert.color === 'red' ? 'border-red-200' :
            alert.color === 'orange' ? 'border-orange-200' : 'border-yellow-200'
          )}>
            <div className={cn(
              "px-6 py-4 flex items-center gap-3 border-b",
              alert.color === 'red' ? 'bg-red-50 border-red-100' :
              alert.color === 'orange' ? 'bg-orange-50 border-orange-100' : 'bg-yellow-50 border-yellow-100'
            )}>
              <alert.icon className={cn(
                "w-6 h-6",
                alert.color === 'red' ? 'text-red-600' :
                alert.color === 'orange' ? 'text-orange-600' : 'text-yellow-600'
              )} />
              <h2 className={cn(
                "text-lg font-bold",
                alert.color === 'red' ? 'text-red-800' :
                alert.color === 'orange' ? 'text-orange-800' : 'text-yellow-800'
              )}>{alert.title}</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</h4>
                  <p className="font-medium text-slate-800 flex items-center gap-1"><MapPin className="w-4 h-4"/> {alert.location}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Risk Level</h4>
                  <span className={cn(
                    "text-sm font-bold px-2 py-1 rounded-md inline-block mt-1",
                    alert.color === 'red' ? 'bg-red-100 text-red-700' :
                    alert.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                  )}>{alert.level}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Expected Impact</h4>
                  <p className="text-slate-700">{alert.impact}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Recommended Action</h4>
                  <p className="font-semibold text-slate-800">{alert.action}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors">
                  {t('View Live Risk Map')}
                </button>
                <button className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors">
                  Safety Instructions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
