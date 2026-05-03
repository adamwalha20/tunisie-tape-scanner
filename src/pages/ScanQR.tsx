import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { scannerUtils } from '../utils/scannerUtils';

export default function ScanQR() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    // Simulate a scan delay
    setTimeout(async () => {
        const result = await scannerUtils.parseVCard('dummy raw qr data');
        navigate('/manual', { state: { prefill: { ...result, source: 'QR' } } });
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col pt-14 pb-24 animate-fade-in overflow-hidden">
      <header className="fixed top-0 left-0 w-full h-14 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-[60]">
        <button onClick={() => navigate(-1)} className="text-white/70 hover:text-white transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="text-sm font-black tracking-tight text-white uppercase">QR Scanner</span>
        <div className="w-10" />
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-center p-6">
        {/* Background Camera Simulation */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img alt="Camera" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full">
           <div className="text-center">
              <h2 className="text-white text-2xl font-black mb-2">Align QR Code</h2>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Hold steady for scanning</p>
           </div>

           <div className="relative w-64 h-64 flex items-center justify-center group" onClick={!scanning ? handleScan : undefined}>
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              
              {/* Scanning Laser */}
              <div className={`w-full h-1 bg-primary/80 absolute shadow-[0_0_20px_2px_rgba(99,102,241,0.8)] ${scanning ? 'animate-[bounce_2s_infinite]' : 'top-1/2'}`} />

              <div className={`w-48 h-48 border border-white/10 rounded-2xl flex items-center justify-center transition-all ${scanning ? 'scale-110 opacity-50' : 'group-hover:scale-105'}`}>
                 <span className="material-symbols-outlined text-white/20 text-6xl">qr_code_2</span>
              </div>
           </div>

           {scanning && (
             <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 animate-pulse">
                <span className="text-white text-xs font-black uppercase tracking-widest">Processing Data...</span>
             </div>
           )}
        </div>

        <div className="absolute bottom-10 left-0 w-full px-6 z-20">
           <button 
             onClick={() => navigate('/manual')}
             className="w-full h-14 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
           >
             <span className="material-symbols-outlined">keyboard</span>
             Manual Entry
           </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
