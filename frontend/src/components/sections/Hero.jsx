import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-tertiary-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium text-gray-300 mb-4 animate-float"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Abhijeet Jena • Ready for Innovation
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Design <br className="hidden md:block" />
            <motion.span 
              className="text-gradient"
              whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Next-Gen
            </motion.span> Apps
          </motion.h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            I'm <span className="text-white font-semibold">Abhijeet Jena</span>, a Full Stack Developer 
            crafting premium web experiences that blend technical excellence with high-end aesthetics.
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-2 group hover-glow relative overflow-hidden" 
              withGlow
              onClick={scrollToProjects}
            >
              <motion.span whileHover={{ x: 5 }} className="flex items-center gap-2">
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Explore</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-primary-500"
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
