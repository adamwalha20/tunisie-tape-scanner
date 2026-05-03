import React from 'react';

export default function TopAppBar({ title = "Tunisie Tape" }: { title?: string }) {
  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 z-[60]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-sm font-black tracking-tight text-text-main uppercase">{title}</span>
      </div>
      <div className="flex items-center gap-4 text-text-muted">
        <span className="material-symbols-outlined text-[20px] hover:text-primary transition-colors cursor-pointer">notifications</span>
        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
}
