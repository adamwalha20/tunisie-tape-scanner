import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[max(85px,calc(70px+env(safe-area-inset-bottom)))] pb-[env(safe-area-inset-bottom)] bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50 px-2">
      <div className="grid grid-cols-5 h-full items-center max-w-lg mx-auto relative">
        
        {/* Home */}
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative h-full ${
            activeTab('/') ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab('/') ? "'FILL' 1" : "'FILL' 0" }}>
            grid_view
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
          {activeTab('/') && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full animate-fade-in" />
          )}
        </button>

        {/* Leads */}
        <button 
          onClick={() => navigate('/leads')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative h-full ${
            activeTab('/leads') ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab('/leads') ? "'FILL' 1" : "'FILL' 0" }}>
            view_list
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest">Leads</span>
          {activeTab('/leads') && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full animate-fade-in" />
          )}
        </button>

        {/* Scan FAB Placeholder - The actual button is absolute centered below */}
        <div className="flex items-center justify-center h-full">
           <div className="w-16 h-16" />
        </div>

        {/* Manual Entry */}
        <button 
          onClick={() => navigate('/manual')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative h-full ${
            activeTab('/manual') ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab('/manual') ? "'FILL' 1" : "'FILL' 0" }}>
            edit_note
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest">Manual</span>
          {activeTab('/manual') && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full animate-fade-in" />
          )}
        </button>

        {/* Profile/Settings */}
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative h-full ${
            activeTab('/profile') ? 'text-primary' : 'text-text-muted hover:text-primary/70'
          }`}
        >
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab('/profile') ? "'FILL' 1" : "'FILL' 0" }}>
            person
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest">Profile</span>
          {activeTab('/profile') && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full animate-fade-in" />
          )}
        </button>

        {/* Floating Scan Button - Perfectly centered */}
        <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-[60] group">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-all duration-500 scale-150" />
          <button 
            onClick={() => navigate('/scan/qr')}
            className="relative w-16 h-16 bg-primary text-white rounded-[22px] shadow-2xl shadow-primary/40 flex items-center justify-center premium-button hover:scale-110 hover:-rotate-6 active:scale-95 transition-all duration-300 border-[5px] border-bg-main"
          >
            <span className="material-symbols-outlined text-[34px]">qr_code_scanner</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
