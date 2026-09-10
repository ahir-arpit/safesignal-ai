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
  ChevronDown
} from 'lucide-react';
import { useAppContext, Role } from '../context/AppContext';

export default function Sidebar() {
  const { role, setRole } = useAppContext();
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/map', label: 'Live Risk Map', icon: MapPin },
    { to: '/alerts', label: 'Alerts & Notifications', icon: Bell },
    { to: '/emergency', label: 'Emergency / SOS', icon: AlertTriangle, badge: 'SOS' },
    { to: '/evacuation', label: 'Evacuation Route', icon: Navigation },
    { to: '/resources', label: 'Resource Management', icon: Box },
    { to: '/ai-priority', label: 'AI Priority Dashboard', icon: BrainCircuit },
    { to: '/analytics', label: 'Disaster Analytics', icon: BarChart3 },
    { to: '/recovery', label: 'Post-Disaster Recovery', icon: RefreshCw },
  ];

  const roles: Role[] = ['Citizen', 'Rescue Team', 'Administrator'];

  return (
    <aside className="w-64 bg-[#090F1E] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none z-30 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-wide leading-tight">
              Rakshak<span className="text-blue-400">Net</span>
            </h1>
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Predict • Prepare • Respond
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-950/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`
                }
              >
                <div className="flex items-center gap-3">
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
        </nav>
      </div>

      {/* User Profile & Role Switcher */}
      <div className="p-3 border-t border-slate-800/80 relative">
        <div
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200 leading-tight">Pallavi Gupta</div>
              <div className="text-[10px] text-blue-400 font-medium">{role}</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Role Menu Popup */}
        {roleMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-50">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase">Select Active Role</div>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                  role === r ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{r}</span>
                {role === r && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
