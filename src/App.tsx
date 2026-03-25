import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-glitch-cyan flex flex-col items-center justify-center relative p-4">
      {/* CRT & Scanline Effects */}
      <div className="crt-overlay" />
      <div className="scanline" />

      <header className="mb-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block"
        >
          <h1 
            className="text-5xl md:text-7xl font-black tracking-tighter glitch-text uppercase italic"
            data-text="NEON_VOID_V1.0"
          >
            NEON_VOID_V1.0
          </h1>
        </motion.div>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-glitch-magenta uppercase tracking-[0.3em] text-[10px] font-bold">
          <span className="flex items-center gap-2"><Terminal size={12} /> SYSTEM_ACTIVE</span>
          <span className="w-2 h-2 bg-glitch-yellow animate-pulse" />
          <span className="flex items-center gap-2"><Activity size={12} /> SIGNAL_STABLE</span>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row items-start justify-center gap-12 z-10 w-full max-w-6xl">
        {/* Game Module */}
        <div className="flex flex-col items-center w-full lg:w-auto">
          <div className="flex items-center gap-4 mb-4 w-full justify-between px-4 py-2 bg-glitch-magenta/10 border-l-4 border-glitch-magenta">
            <div className="flex items-center gap-3">
              <Zap className="text-glitch-yellow animate-bounce" size={20} />
              <span className="text-2xl font-bold tracking-widest">
                DATA_COLLECTED: {score.toString().padStart(6, '0')}
              </span>
            </div>
          </div>
          <div className="pixel-border bg-black p-2">
            <SnakeGame onScoreChange={setScore} />
          </div>
        </div>

        {/* Audio & Control Modules */}
        <div className="flex flex-col gap-8 w-full max-w-md">
          <MusicPlayer />
          
          <div className="p-6 bg-black border-2 border-glitch-cyan/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-glitch-cyan text-black text-[8px] font-bold">MANUAL_V2</div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-glitch-magenta mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-glitch-magenta" /> INPUT_MAPPINGS
            </h4>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-[10px] uppercase font-bold">
              <div className="flex flex-col gap-2">
                <span className="text-glitch-cyan/50">Y_AXIS_POS</span>
                <kbd className="w-fit px-3 py-1 bg-glitch-cyan text-black border-b-4 border-glitch-magenta">UP_ARROW</kbd>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-glitch-cyan/50">Y_AXIS_NEG</span>
                <kbd className="w-fit px-3 py-1 bg-glitch-cyan text-black border-b-4 border-glitch-magenta">DOWN_ARROW</kbd>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-glitch-cyan/50">X_AXIS_NEG</span>
                <kbd className="w-fit px-3 py-1 bg-glitch-cyan text-black border-b-4 border-glitch-magenta">LEFT_ARROW</kbd>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-glitch-cyan/50">X_AXIS_POS</span>
                <kbd className="w-fit px-3 py-1 bg-glitch-cyan text-black border-b-4 border-glitch-magenta">RIGHT_ARROW</kbd>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-glitch-magenta/40 leading-relaxed uppercase italic">
            WARNING: SYSTEM OVERHEATING. PROLONGED EXPOSURE TO THE VOID MAY CAUSE TEMPORAL DISPLACEMENT.
            DO NOT DISCONNECT DURING DATA TRANSMISSION.
          </div>
        </div>
      </main>

      <footer className="mt-16 text-glitch-cyan/20 text-[8px] uppercase tracking-[0.5em] font-bold z-10">
        [REDACTED] // PROJECT_NEON_VOID // 2026_MARCH_24
      </footer>
    </div>
  );
}
