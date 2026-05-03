import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-slate-950 font-['Inter'] text-[11px] font-semibold uppercase tracking-wider fixed bottom-0 left-0 w-full flex justify-around items-center px-4 h-[max(80px,calc(56px+env(safe-area-inset-bottom)))] pb-[env(safe-area-inset-bottom)] bg-white/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 shadow-[0_-1px_3px_0_rgba(0,0,0,0.05)] z-50">
      {/* Dashboard Tab */}
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center justify-center p-2 active:scale-95 transition-transform duration-150 w-full max-w-[80px] ${
          activeTab('/') ? 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-900 rounded-lg' : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'
        }`}
      >
        <span className="material-symbols-outlined mb-1 text-[24px]" style={{ fontVariationSettings: activeTab('/') ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
        <span className="truncate w-full text-center">Dashboard</span>
      </button>

      {/* Leads Tab */}
      <button 
        className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-2 hover:text-blue-500 active:scale-95 transition-transform duration-150 w-full max-w-[80px]"
      >
        <span className="material-symbols-outlined mb-1 text-[24px]">list_alt</span>
        <span className="truncate w-full text-center">Leads</span>
      </button>

      {/* Scan Tab */}
      <button 
        onClick={() => navigate('/scan/qr')}
        className={`flex flex-col items-center justify-center p-2 active:scale-95 transition-transform duration-150 w-full max-w-[80px] ${
          activeTab('/scan/qr') || activeTab('/scan/card') ? 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-900 rounded-lg' : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'
        }`}
      >
        <span className="material-symbols-outlined mb-1 text-[24px]" style={{ fontVariationSettings: activeTab('/scan/qr') || activeTab('/scan/card') ? "'FILL' 1" : "'FILL' 0" }}>qr_code_scanner</span>
        <span className="truncate w-full text-center">Scan</span>
      </button>

      {/* Settings Tab */}
      <button 
        onClick={() => {
          // just mock logout here for easy testing
          import('../lib/supabase').then(({supabase}) => supabase.auth.signOut());
        }}
        className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-2 hover:text-blue-500 active:scale-95 transition-transform duration-150 w-full max-w-[80px]"
      >
        <span className="material-symbols-outlined mb-1 text-[24px]">settings</span>
        <span className="truncate w-full text-center">Settings</span>
      </button>
    </nav>
  );
}
