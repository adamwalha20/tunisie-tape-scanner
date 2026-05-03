import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { scannerUtils } from '../utils/scannerUtils';

export default function ScanQR() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    const result = await scannerUtils.parseVCard('dummy raw qr data');
    navigate('/add-manual', { state: { prefill: result } });
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-hidden select-none">
      <header className="bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 font-['Inter'] font-bold text-lg tracking-tight flex justify-between items-center w-full px-5 h-14 max-w-full fixed top-0 z-50 shadow-sm">
        <button onClick={() => navigate('/')} className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined font-normal">arrow_back</span>
        </button>
        <h1 className="text-blue-600 dark:text-blue-400 font-black tracking-tighter">LeadCapture Pro</h1>
        <div className="w-10"></div> {/* Spacer to center the title since the back button takes up space */}
      </header>

      <main className="relative h-screen w-full pt-[56px] pb-[80px] bg-inverse-surface flex flex-col items-center justify-center overflow-hidden">
        {/* Simulated Camera Feed Background */}
        <div className="absolute inset-0 z-0">
          <img alt="Camera feed background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvWZTzjQmDWZrbFwbcZ1X9GGNWoE23p59WwKvOfIGmng8C890KRHtYjVU5ZzXc75g6eTHJddS62Ob2YA89QtUn6-1V7EBbm_qZ630ZolmFXO1l72MUfhFcL_6IhFwizy_PO2jtm6_2o9i7p9-W-uXff32mQK-DvDSGGfydLeVVG-83zYl4LNwYl605hK5pOyY2BRDARJoSjZqvu20jytOv2v8Q13M1G0kXnV6x-kj09Wg9sWBQ1vBd97yQWqA2aFhjfqLFATRsZyk" />
        </div>

        {/* Scanner UI Overlay Container */}
        <div className="relative z-10 w-full h-full flex flex-col items-center px-edge-margin pt-xl pb-md">
          {/* Instruction Text */}
          <p className="font-h1 text-h1 text-on-secondary mb-xl text-center drop-shadow-md mt-8">Place QR code in frame</p>
          
          {/* Scanning Reticle */}
          <div className={`relative w-64 h-64 mt-md ${scanning ? 'animate-pulse opacity-50' : 'cursor-pointer'}`} onClick={!scanning ? handleScan : undefined}>
            {/* Dimming Overlay outside the reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-xl shadow-[0_0_0_9999px_rgba(19,27,46,0.6)] pointer-events-none"></div>
            
            {/* Green Highlight / Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-secondary-fixed rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-secondary-fixed rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-secondary-fixed rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-secondary-fixed rounded-br-xl"></div>
            
            {/* Laser line indicator */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-secondary-fixed shadow-[0_0_12px_2px_rgba(111,251,190,0.8)] opacity-80"></div>
          </div>
          
          {/* Spacer to push manual entry to the bottom */}
          <div className="flex-1"></div>
          
          {/* Manual Entry Fallback Card */}
          <div className="w-full max-w-sm bg-surface rounded-xl p-sm shadow-sm border border-outline-variant flex items-center justify-between mt-auto mb-20 backdrop-blur-md bg-white/95">
            <div className="flex items-center gap-sm pl-sm">
              <span className="material-symbols-outlined text-outline">keyboard</span>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md text-on-surface font-semibold">QR code won't scan?</span>
                <span className="font-status text-status text-on-surface-variant">Enter badge ID manually</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/add-manual')}
              className="h-[48px] px-lg bg-primary text-on-primary rounded-lg font-status text-status flex items-center justify-center hover:bg-primary-fixed-dim transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
