import { useTranslation } from 'react-i18next';
import { ShieldCheck, Heart, User, MapPin } from 'lucide-react';
import SOSButton from '../components/SOSButton';

export default function Family() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">{t('Family')} Safety</h1>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-colors">
          <Heart className="w-4 h-4" />
          {t("I'm Safe")}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">MY FAMILY</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: t('Father'), status: 'SAFE', color: 'text-green-600', bg: 'bg-green-100', time: '8 min ago' },
            { name: t('Mother'), status: 'SAFE', color: 'text-green-600', bg: 'bg-green-100', time: '4 min ago' },
            { name: 'Brother', status: 'NEEDS CHECK', color: 'text-yellow-600', bg: 'bg-yellow-100', time: '2 min ago' },
          ].map((member, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${member.color} ${member.bg}`}>
                      {member.status}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Last location: {member.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 font-semibold text-sm transition-colors">
                  Check In
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 font-semibold text-sm transition-colors">
                  Share Location
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <SOSButton />
      </div>
    </div>
  );
}
