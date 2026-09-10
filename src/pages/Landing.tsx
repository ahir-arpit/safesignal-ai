import { useTranslation } from 'react-i18next';
import { ArrowRight, Shield, Activity, Map as MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-8">
            <Activity className="w-4 h-4" />
            <span>{t('System Operational')}</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-navy-900 tracking-tight mb-8">
            <span className="block text-slate-800">{t('Hero.Headline').split('.')[0]}.</span>
            <span className="block text-slate-600">{t('Hero.Headline').split('.').slice(1).join('.')}</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('Hero.Subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {t('Get Started')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/map" 
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <MapIcon className="w-5 h-5" />
              {t('View Live Risk Map')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '24/7 Monitoring', desc: 'Continuous environmental data analysis' },
              { title: 'Real-Time Alerts', desc: 'Instant notifications for active threats' },
              { title: 'AI Risk Intelligence', desc: 'Advanced predictive risk modeling' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <Shield className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
