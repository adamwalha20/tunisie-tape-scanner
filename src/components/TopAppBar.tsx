import React from 'react';

export default function TopAppBar({ title = "LeadCapture Pro" }: { title?: string }) {
  return (
    <header className="bg-white dark:bg-slate-950 flex justify-between items-center w-full px-5 h-14 max-w-full docked full-width top-0 border-b-2 border-green-500 border-b border-slate-100 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-['Inter'] font-bold text-lg tracking-tight fixed z-40">
      <div className="flex items-center gap-sm">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>signal_cellular_alt</span>
        <h1 className="text-blue-600 dark:text-blue-400 font-black tracking-tighter">{title}</h1>
      </div>
      <div className="flex items-center gap-xs text-secondary" title="Synced">
        <span className="font-status text-status tracking-wide mr-1 uppercase">Live</span>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>sync</span>
      </div>
    </header>
  );
}
