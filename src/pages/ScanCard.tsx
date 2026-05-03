import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

export default function ScanCard() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleCapture = async () => {
    setScanning(true);
    // Simulate OCR delay
    setTimeout(() => {
      const result = {
        fullName: 'John Doe',
        company: 'Example Corp',
        jobTitle: 'Software Engineer',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        source: 'OCR'
      };
      navigate('/manual', { state: { prefill: result } });
    }, 2500);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col pt-14 pb-24 animate-fade-in">
      <header className="fixed top-0 left-0 w-full h-14 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-[60]">
        <button onClick={() => navigate(-1)} className="text-white/70 hover:text-white transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="text-sm font-black tracking-tight text-white uppercase">Business Card Scan</span>
        <div className="w-10" />
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0 z-0 opacity-40">
           <img alt="Camera" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1554177255-61502b352de3?auto=format&fit=crop&q=80&w=1000" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full">
           <div className="text-center">
              <h2 className="text-white text-2xl font-black mb-2">Scan Card</h2>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Position the card inside the box</p>
           </div>

           <div className="relative w-80 h-48 group">
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl backdrop-blur-[2px]" />
              
              {/* Animated Corners */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-secondary rounded-tl-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-secondary rounded-tr-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-secondary rounded-bl-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-secondary rounded-br-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

              {scanning && (
                <div className="absolute inset-0 bg-secondary/10 animate-pulse rounded-2xl flex items-center justify-center">
                   <div className="w-full h-1 bg-secondary absolute top-0 animate-[slideDown_2s_infinite]" />
                   <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Analyzing...</span>
                </div>
              )}
           </div>

           {!scanning && (
             <button 
               onClick={handleCapture}
               className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform group"
             >
               <div className="w-16 h-16 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:scale-95 transition-transform">
                  <div className="w-12 h-12 bg-black/5 rounded-full" />
               </div>
             </button>
           )}
        </div>
        
        <style>{`
          @keyframes slideDown {
            0% { top: 0; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
      </main>

      <BottomNavBar />
    </div>
  );
}
