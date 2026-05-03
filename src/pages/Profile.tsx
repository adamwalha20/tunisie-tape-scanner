import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-main text-text-main min-h-screen flex flex-col pt-14 pb-24 animate-fade-in">
      <header className="fixed top-0 left-0 w-full h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-center px-6 z-[60]">
        <span className="text-sm font-black tracking-tight text-text-main uppercase">Profile</span>
      </header>

      <main className="flex-1 flex flex-col items-center p-8 gap-8 w-full max-w-md mx-auto">
        <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-primary to-accent p-1 shadow-2xl shadow-primary/20">
          <div className="w-full h-full rounded-[38px] bg-white flex items-center justify-center overflow-hidden">
             <span className="material-symbols-outlined text-6xl text-primary/20">person</span>
          </div>
        </div>

        <div className="text-center flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight">TunisieTape</h1>
          <p className="text-text-muted font-bold">Admin Account</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="glass-card p-6 flex flex-col items-center gap-2">
            <span className="text-3xl font-black text-primary">124</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Leads</span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center gap-2">
            <span className="text-3xl font-black text-accent">12</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Events</span>
          </div>
        </div>

        <section className="w-full flex flex-col gap-3 mt-4">
          <button className="w-full h-16 glass-card px-6 flex items-center justify-between group hover:bg-primary/5 transition-all">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">settings</span>
              <span className="font-bold text-sm">Account Settings</span>
            </div>
            <span className="material-symbols-outlined text-text-muted group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
          <button className="w-full h-16 glass-card px-6 flex items-center justify-between group hover:bg-primary/5 transition-all">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">notifications</span>
              <span className="font-bold text-sm">Notifications</span>
            </div>
            <span className="material-symbols-outlined text-text-muted group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
          <button className="w-full h-16 glass-card px-6 flex items-center justify-between group hover:bg-primary/5 transition-all">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="font-bold text-sm">Security & Privacy</span>
            </div>
            <span className="material-symbols-outlined text-text-muted group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </section>

        <button className="w-full h-14 rounded-2xl border-2 border-slate-100 text-danger font-bold text-sm hover:bg-danger/5 transition-all mt-8">
          Sign Out
        </button>
      </main>

      <BottomNavBar />
    </div>
  );
}
