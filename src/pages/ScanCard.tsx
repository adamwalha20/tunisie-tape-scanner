import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { scannerUtils } from '../utils/scannerUtils';

export default function ScanCard() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleCapture = async () => {
    setScanning(true);
    const result = await scannerUtils.processBusinessCardOCR();
    navigate('/add-manual', { state: { prefill: result } });
  };

  return (
    <div className="bg-inverse-surface text-on-surface font-body-md text-body-md h-screen w-full overflow-hidden relative flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Camera Feed Background Simulation */}
      <div className="absolute inset-0 z-0">
        <img alt="Camera feed simulation" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnOpfICEIYhTTAPZ2Fe3w2sdR4bU7DawGZHiGijgpWcGfHNFTvfb-LcMXDXS5qNlhVMJjMSwlZ3qPRM8NW1lvCSX76W4TSInebDiLV2OPCn47gU0wE9GcwGq0hmoSrXtsVUlSv1776lLPeye0P_-kAAEMyABSiVfIV4OaSM9oCnDKxEqMZa_KESf2kBU8TuPEQ83fKDuvHxsu-OkTVqkfEGyRT5woRSIcsaXIUuCuy0hZQ2KKxPhIA4yLdJmlf6dAmerQA6wRJdMw" />
      </div>
      
      {/* Scrim overlay to darken edges slightly, focusing on the center */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>

      {/* Top Action Bar (Absolute) */}
      <div className="absolute top-edge-margin left-edge-margin right-edge-margin flex justify-between items-center z-20">
        {/* Close / Cancel Task */}
        <button onClick={() => navigate('/')} aria-label="Cancel scanning" className="w-touch-target-min h-touch-target-min rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm active:scale-95 transition-transform border border-outline-variant">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
        </button>
        {/* Flash Toggle */}
        <button aria-label="Toggle flash" className="w-touch-target-min h-touch-target-min rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm active:scale-95 transition-transform border border-outline-variant">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>flash_off</span>
        </button>
      </div>

      {/* Center Reticle & Feedback */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none pb-24">
        {/* Status Indicator */}
        <div className="mb-lg font-status text-status bg-secondary-fixed text-on-secondary-fixed px-md py-sm rounded-full flex items-center gap-unit shadow-lg">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>document_scanner</span>
          Ready to scan
        </div>
        
        {/* Bounding Box */}
        <div className="w-[85%] max-w-[400px] aspect-[1.586/1] relative border-2 border-white/30 rounded-DEFAULT shadow-[0_0_0_4000px_rgba(0,0,0,0.4)]">
          {/* Animated Scan Line Simulation */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary-fixed shadow-[0_0_8px_2px_rgba(111,251,190,0.5)] opacity-50"></div>
          {/* Corner Brackets */}
          <div className="absolute w-8 h-8 top-[-2px] left-[-2px] border-t-4 border-l-4 border-secondary-fixed rounded-tl-DEFAULT"></div>
          <div className="absolute w-8 h-8 top-[-2px] right-[-2px] border-t-4 border-r-4 border-secondary-fixed rounded-tr-DEFAULT"></div>
          <div className="absolute w-8 h-8 bottom-[-2px] left-[-2px] border-b-4 border-l-4 border-secondary-fixed rounded-bl-DEFAULT"></div>
          <div className="absolute w-8 h-8 bottom-[-2px] right-[-2px] border-b-4 border-r-4 border-secondary-fixed rounded-br-DEFAULT"></div>
        </div>
        
        <div className="mt-md font-body-md text-body-md text-white/90 text-center px-lg drop-shadow-md">
          Align business card within the frame
        </div>
      </div>

      {/* Bottom Controls & OCR Preview (Absolute Bottom-Weighted) */}
      <div className="absolute bottom-0 w-full z-20 flex flex-col items-center pb-[40px] pt-xl bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        {/* Live OCR Preview Panel */}
        <div className="w-[90%] max-w-[400px] bg-surface/95 backdrop-blur-lg rounded-xl shadow-lg border border-outline-variant p-md mb-xl flex flex-col gap-sm transform transition-all translate-y-0">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Detecting Details</span>
          </div>
          <div className="flex flex-col gap-unit">
            <div className="font-h2 text-h2 text-on-surface truncate">
              Sarah Jenkins
            </div>
            <div className="font-body-md text-body-md text-on-surface-variant flex items-center gap-unit truncate">
              <span className="material-symbols-outlined text-[16px]">apartment</span>
              Lumina Tech Solutions
            </div>
          </div>
        </div>
        
        {/* Shutter Button Area */}
        <div className="flex items-center justify-center w-full relative">
          <button 
            onClick={handleCapture}
            disabled={scanning}
            aria-label="Capture image" className={`w-[88px] h-[88px] rounded-full border-[4px] border-surface flex items-center justify-center bg-transparent group active:scale-95 transition-transform duration-200 ${scanning ? 'opacity-50' : ''}`}
          >
            <div className={`w-[68px] h-[68px] bg-surface rounded-full transition-all duration-200 shadow-sm flex items-center justify-center ${scanning ? 'animate-pulse' : 'group-active:w-[60px] group-active:h-[60px]'}`}>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
