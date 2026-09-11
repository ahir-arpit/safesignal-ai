import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  MapPin,
  Bell,
  AlertTriangle,
  Navigation,
  Box,
  BrainCircuit,
  BarChart3,
  RefreshCw,
  User,
  ChevronDown,
  Building2,
  Users
} from 'lucide-react';
import { useAppContext, Role } from '../context/AppContext';

export default function Sidebar() {
  const { role, setRole } = useAppContext();
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const publicNavItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/map', label: 'Live Risk Map', icon: MapPin },
    { to: '/alerts', label: 'Disaster Alerts', icon: Bell },
    { to: '/emergency', label: 'Emergency / SOS', icon: AlertTriangle, badge: 'SOS' },
    { to: '/evacuation', label: 'Evacuation Route', icon: Navigation },
    { to: '/family', label: 'Family Safety', icon: Users },
    { to: '/recovery', label: 'Disaster Recovery', icon: RefreshCw },
  ];

  const govtNavItems = [
    { to: '/ai-priority', label: 'AI Priority Triage', icon: BrainCircuit, badge: 'AI' },
    { to: '/resources', label: 'Resource Management', icon: Box },
    { to: '/analytics', label: 'Command Analytics', icon: BarChart3 },
  ];

  const isGovtRole = role === 'Rescue Team' || role === 'Administrator';

  return (
    <aside className="w-64 bg-[#090F1E] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none z-30 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white tracking-wide leading-tight">
                Safe<span className="text-blue-400">Signal</span>
              </h1>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Predict • Prepare • Respond
              </p>
            </div>
          </div>
        </div>

        {/* Portal Access Indicator */}
        <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Portal Access</span>
          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${
            isGovtRole 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          }`}>
            {isGovtRole ? '🏛️ Government Portal' : '🌐 Public Portal'}
          </span>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-4">
          {/* Public Use Section */}
          <div>
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
              <Users className="w-3 h-3 text-blue-400" />
              <span>Public Use Portal</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {publicNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-950/50'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Government Use Section */}
          <div>
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-amber-400" />
              <span>Government Portal</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {govtNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-950/50'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0 text-amber-400/80" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* User Profile & Role Switcher */}
      <div className="p-3 border-t border-slate-800/80 relative">
        <div
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              isGovtRole
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-400'
                : 'bg-blue-500/20 border-blue-400/40 text-blue-400'
            }`}>
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200 leading-tight">User</div>
              <div className="text-[10px] text-blue-400 font-medium flex items-center gap-1">
                <span>{role}</span>
                <span className="text-[9px] text-slate-500">({isGovtRole ? 'Govt' : 'Public'})</span>
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Role Menu Popup */}
        {roleMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Access Portal Mode</div>
            
            <div className="text-[9px] font-semibold text-blue-400 px-2 pt-1 uppercase">🌐 Public Use</div>
            <button
              onClick={() => {
                setRole('Citizen');
                setRoleMenuOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                role === 'Citizen' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Citizen Access</span>
              {role === 'Citizen' && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
            </button>

            <div className="text-[9px] font-semibold text-amber-400 px-2 pt-2 uppercase">🏛️ Government Use</div>
            <button
              onClick={() => {
                setRole('Rescue Team');
                setRoleMenuOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                role === 'Rescue Team' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Rescue Team (NDRF / Emergency)</span>
              {role === 'Rescue Team' && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
            </button>

            <button
              onClick={() => {
                setRole('Administrator');
                setRoleMenuOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                role === 'Administrator' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Disaster Authority Admin</span>
              {role === 'Administrator' && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
