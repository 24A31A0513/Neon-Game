import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { motion } from 'motion/react';

const PLAYLIST = [
  {
    id: 1,
    title: "VOID_RESONANCE",
    artist: "CORE_DUMP",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "var(--color-glitch-magenta)"
  },
  {
    id: 2,
    title: "SIGNAL_DECAY",
    artist: "NULL_POINTER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "var(--color-glitch-cyan)"
  },
  {
    id: 3,
    title: "GHOST_IN_SHELL",
    artist: "BINARY_SOUL",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "var(--color-glitch-yellow)"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-md bg-black border-2 border-glitch-cyan/30 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 p-1 bg-glitch-magenta text-black text-[8px] font-bold">AUDIO_STREAM_V4</div>
      
      <div className="flex items-center gap-6 mb-8 mt-4">
        <div 
          className="w-20 h-20 flex items-center justify-center bg-black border-4 border-glitch-cyan shadow-[4px_4px_0_var(--color-glitch-magenta)]"
        >
          <Music className="w-10 h-10" style={{ color: currentTrack.color }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-black truncate uppercase italic tracking-tighter glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-glitch-magenta text-[10px] font-bold tracking-widest uppercase mt-1">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
      />

      <div className="flex items-center justify-center gap-10">
        <button onClick={prevTrack} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
          <SkipBack className="w-8 h-8" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-16 h-16 bg-glitch-cyan text-black flex items-center justify-center shadow-[4px_4px_0_var(--color-glitch-magenta)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-black" />
          ) : (
            <Play className="w-8 h-8 fill-black translate-x-0.5" />
          )}
        </button>

        <button onClick={nextTrack} className="text-glitch-cyan hover:text-glitch-magenta transition-colors">
          <SkipForward className="w-8 h-8" />
        </button>
      </div>

      <div className="mt-8">
        <div className="h-2 bg-glitch-cyan/10 border border-glitch-cyan/20 overflow-hidden">
          <motion.div 
            className="h-full bg-glitch-magenta shadow-[0_0_10px_var(--color-glitch-magenta)]"
            animate={{ width: isPlaying ? "100%" : "0%" }}
            transition={{ duration: 180, ease: "linear" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[8px] font-bold text-glitch-cyan/40">
          <span>00:00</span>
          <span>SYNC_ACTIVE</span>
          <span>99:99</span>
        </div>
      </div>
    </div>
  );
}
