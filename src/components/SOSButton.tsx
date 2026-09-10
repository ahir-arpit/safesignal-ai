import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SOSButton() {
  const { t } = useTranslation();
  const { sosActive, setSosActive } = useAppContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSosClick = () => {
    if (sosActive) return;
    setShowConfirm(true);
  };

  const confirmSos = () => {
    setShowConfirm(false);
    setSosActive(true);
  };

  return (
    <>
      <button
        onClick={handleSosClick}
        disabled={sosActive}
        className={`relative overflow-hidden group px-8 py-4 rounded-full font-bold text-lg tracking-widest text-white transition-all
          ${sosActive ? 'bg-red-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-105'}
        `}
      >
        <span className="relative z-10">{sosActive ? t('SOS SENT') : t('SOS')}</span>
        {!sosActive && (
          <span className="absolute inset-0 rounded-full border-4 border-red-500 opacity-0 group-hover:animate-ping"></span>
        )}
      </button>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-600 font-bold text-3xl">!</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Are you in immediate danger?</h2>
              <p className="text-slate-600 mb-8">This will alert emergency responders and your family with your GPS location.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={confirmSos}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-lg transition-colors"
                >
                  YES — SEND SOS
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-lg transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {sosActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden">
              <div className="bg-red-600 p-4 text-white flex justify-between items-center">
                <h3 className="font-bold">{t('SOS SENT')}</h3>
                <button onClick={() => setSosActive(false)} className="text-red-200 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{t('Emergency ID')}:</span>
                  <span className="font-mono font-bold text-slate-800">SOS-2026-000184</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{t('Responder Searching')}</div>
                    <div className="text-sm text-slate-500">Nearest responder: 1.2 km away</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm border border-blue-100 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> {t('Call Responder')}
                  </button>
                  <button className="py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" /> {t('Share Location')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
