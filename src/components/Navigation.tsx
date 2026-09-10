import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { ShieldAlert, Globe, Menu, X, LayoutDashboard, Map as MapIcon, Bell, Users, Settings } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'hr', name: 'हरियाणवी' }
];

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const { role } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('Dashboard') },
    { to: '/alerts', icon: Bell, label: t('Alerts') },
    { to: '/map', icon: MapIcon, label: t('Map') },
    { to: '/family', icon: Users, label: t('Family') },
  ];

  if (role === 'Admin' || role === 'Government Authority') {
    navLinks.push({ to: '/admin', icon: Settings, label: 'Admin' });
  }

  return (
    <nav className="bg-[#071A2B] text-white sticky top-0 z-40 w-full shadow-md">
      {/* System Status Bar */}
      <div className="bg-[#22C55E] text-white text-xs font-semibold py-1 px-4 text-center tracking-wider">
        {t('System Operational')}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <ShieldAlert className="w-8 h-8 text-[#E53935]" />
            <span className="font-bold text-xl tracking-tight hidden sm:block">SAFESIGNAL AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/5">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{languages.find(l => l.code === i18n.language)?.name || 'English'}</span>
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl py-2 hidden group-hover:block border border-slate-100">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm transition-colors",
                      i18n.language === lang.code ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a2540] border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium",
                  isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
