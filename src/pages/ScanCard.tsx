import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import BottomNavBar from '../components/BottomNavBar';
import { scannerUtils } from '../utils/scannerUtils';

export default function ScanCard() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleCapture = async () => {
    if (!webcamRef.current) return;
    setScanning(true);
    
    // Capture the screenshot
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (imageSrc) {
      // imageSrc is a data URI like "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      // We need to strip the prefix for the Gemini API
      const base64Data = imageSrc.split(',')[1];
      
      try {
        const result = await scannerUtils.processBusinessCardOCR(base64Data);
        navigate('/manual', { state: { prefill: result } });
      } catch (error) {
        console.error("Failed to parse business card", error);
        alert("Could not extract data from the card. Please try again.");
        setScanning(false);
      }
    } else {
      setScanning(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col pt-14 pb-24 animate-fade-in overflow-hidden">
      <header className="fixed top-0 left-0 w-full h-14 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-[60]">
        <button onClick={() => navigate(-1)} className="text-white/70 hover:text-white transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="text-sm font-black tracking-tight text-white uppercase">Business Card Scan</span>
        <div className="w-10" />
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0 z-0">
           <Webcam
             ref={webcamRef}
             audio={false}
             screenshotFormat="image/jpeg"
             videoConstraints={{ facingMode: "environment" }}
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full">
           <div className="text-center">
              <h2 className="text-white text-2xl font-black mb-2">Scan Card</h2>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Position the card inside the box</p>
           </div>

           <div className="relative w-80 h-48 group">
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl backdrop-blur-[2px] transition-all" />
              
              {/* Animated Corners */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-secondary rounded-tl-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-secondary rounded-tr-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-secondary rounded-bl-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-secondary rounded-br-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

              {scanning && (
                <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm animate-pulse rounded-2xl flex items-center justify-center border border-secondary/50">
                   <div className="w-full h-1 bg-secondary absolute top-0 animate-[slideDown_2s_infinite]" />
                   <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg px-3 py-1 bg-black/50 rounded-full">Analyzing...</span>
                </div>
              )}
           </div>

           {!scanning && (
             <button 
               onClick={handleCapture}
               className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-90 transition-all hover:bg-gray-100 group z-20 mt-4"
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
