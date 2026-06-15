import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, SkipForward } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  const track = {
    title: "Legends Never Die",
    artist: "Against The Current",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", // Update with user's preferred link
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="flex items-center gap-4 glass p-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            {/* Visualizer Icon */}
            <div 
              className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center relative overflow-hidden group cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[2px] h-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 16, 8, 14, 6] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.8, 
                        delay: i * 0.1,
                        ease: "easeInOut" 
                      }}
                      className="w-[3px] bg-primary-400 rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <Music size={20} className="text-primary-400" />
              )}
            </div>

            {/* Info & Controls */}
            <div className="flex flex-col pr-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="overflow-hidden w-24">
                  <motion.p 
                    className="text-[10px] font-bold text-white whitespace-nowrap"
                    animate={isPlaying ? { x: [0, -50, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  >
                    {track.title} • {track.artist}
                  </motion.p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={togglePlay}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button 
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
              </div>
              
              {/* Progress Bar (Fake for UI) */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-500"
                  animate={isPlaying ? { width: ["0%", "100%"] } : { width: "30%" }}
                  transition={isPlaying ? { duration: 180, ease: "linear" } : {}}
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src={track.url}
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
