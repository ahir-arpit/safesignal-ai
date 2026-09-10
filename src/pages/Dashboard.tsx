import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, MapPin, Phone, Users, ShieldCheck, HeartPulse } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import SOSButton from '../components/SOSButton';

export default function Dashboard() {
  const { t } = useTranslation();
  const { sosActive } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{t('Dashboard')}</h1>
          <p className="text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4" /> {t('Lucknow, India')}
          </p>
        </div>
        <SOSButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Risk Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{t('Current Risk Level')}</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center border-4 border-yellow-400">
              <span className="text-yellow-600 font-bold text-xl">!</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{t('MODERATE')}</div>
              <div className="text-sm text-slate-500">{t('Location')}: {t('Lucknow, India')}</div>
            </div>
          </div>
          <div className="space-y-3">
            <RiskIndicator label={t('Flood')} level={t('Low')} color="bg-green-500" />
            <RiskIndicator label={t('Earthquake')} level={t('MODERATE')} color="bg-yellow-500" />
            <RiskIndicator label={t('Fire')} level={t('Low')} color="bg-green-500" />
            <RiskIndicator label={t('Storm')} level={t('High')} color="bg-orange-500" />
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider">{t('Active Alerts')}</h3>
            <span className="animate-pulse flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div className="mb-6">
            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              {t('FLOOD WARNING')}
            </h4>
            <p className="text-slate-600 mt-2">{t('High flood risk detected in your area.')}</p>
          </div>
          <button className="w-full py-2 bg-red-50 text-red-700 font-semibold rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
            {t('View Details')}
          </button>
        </div>

        {/* Safe Zone */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{t('Nearest Safe Shelter')}</h3>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Community Relief Center</h4>
              <p className="text-sm text-slate-500 mt-1">{t('Distance')}: 1.4 km</p>
              <p className="text-sm text-slate-500">{t('Capacity')}: 72%</p>
            </div>
          </div>
          <button className="w-full py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
            {t('Get Directions')}
          </button>
        </div>

        {/* Hospital */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{t('City Emergency Hospital')}</h3>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">City General</h4>
              <p className="text-sm text-slate-500 mt-1">{t('Distance')}: 2.1 km</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> {t('Call')}
            </button>
            <button className="flex-1 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
              {t('Get Directions')}
            </button>
          </div>
        </div>

        {/* Family Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{t('Emergency Contacts')}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800">{t('Father - Safe')}</span>
              </div>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800">{t('Mother - Safe')}</span>
              </div>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-800">{t('Brother - Unknown')}</span>
              </div>
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
            </div>
          </div>
        </div>

        {/* Safety Score */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{t('Preparedness Score')}</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-slate-800">78%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <button className="w-full py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
            {t('Improve Safety Score')}
          </button>
        </div>
      </div>
    </div>
  );
}

function RiskIndicator({ label, level, color }: { label: string, level: string, color: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-slate-800 font-semibold">{level}</span>
        <span className={cn("w-2 h-2 rounded-full", color)}></span>
      </div>
    </div>
  );
}
