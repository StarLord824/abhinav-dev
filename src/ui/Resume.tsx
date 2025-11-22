'use client';
import React, { useMemo } from 'react';
import { motion, Variants } from 'motion/react';
import { Download } from 'lucide-react';

export default function Floating2DResumeObject() {
  const resumePath: string = `https://drive.google.com/file/d/1bpiWu4I7yTRPAXzNa5y_CsGbCHN7FwHb/view?usp=drive_link`;

  // Memoize animation variants for performance
  const floatAnimation: Variants = useMemo(() => ({
    animate: {
      y: [0, -8, -12, -8, 0],
      rotateY: [0, 5, 0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  const rotate3dAnimation: Variants = useMemo(() => ({
    animate: {
      rotateX: [15, 20, 15, 10, 15],
      rotateY: [-15, -10, -15, -20, -15],
      rotateZ: [0, 2, 0, -2, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }), []);

  return (
    <a href={resumePath} target="_blank" rel="noopener noreferrer">
      <motion.div 
        className="absolute top-1/2 right-4 sm:right-8 md:right-1/10 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer group md:[perspective:1000px]"
        variants={floatAnimation}
        animate="animate"
      >
        <div className="relative md:[transform-style:preserve-3d]">
          {/* Ambient glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-violet-500/30 to-pink-500/20 rounded-3xl blur-xl"
            initial={{ scale: 1.5 }}
            whileHover={{ scale: 1.75 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Main 2.5D Object - Responsive sizing */}
          <motion.div 
            className="relative bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-2xl shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-300 h-[150px] w-[120px] sm:h-[180px] sm:w-[140px] md:h-[200px] md:w-[160px]"
            variants={rotate3dAnimation}
            animate="animate"
            initial={{
              rotateX: 15,
              rotateY: -15
            }}
          >
            {/* Top face gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-violet-400/80 via-purple-500/90 to-indigo-600/80 rounded-2xl md:[transform:translateZ(8px)] md:[clip-path:polygon(0_0,_100%_0,_90%_100%,_10%_100%)]"
            />
            
            {/* Side faces for 2.5D effect - Desktop only */}
            <div 
              className="hidden md:block absolute bg-gradient-to-b from-violet-600/60 to-purple-800/80 rounded-r-2xl right-[-8px] top-0 h-full w-2 [transform:rotateY(90deg)_translateZ(4px)]"
            />
            
            <div 
              className="hidden md:block absolute bg-gradient-to-r from-indigo-600/60 to-purple-700/80 rounded-b-2xl right-[-8px] top-0 h-full w-2 [transform:rotateY(90deg)_translateZ(4px)]"
            />
            
            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-2 sm:p-3 text-white">
              {/* Document icon representation */}
              <div className="mb-1">
                <div className="w-5 h-6 sm:w-6 sm:h-8 bg-white/90 rounded-sm shadow-inner relative">
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-violet-300 transform rotate-45 origin-bottom-left" />
                  <div className="absolute top-1.5 sm:top-2 left-0.5 sm:left-1 right-0.5 sm:right-1 h-px bg-violet-400/60" />
                  <div className="absolute top-2.5 sm:top-3 left-0.5 sm:left-1 right-0.5 sm:right-1 h-px bg-violet-400/40" />
                  <div className="absolute top-3.5 sm:top-4 left-0.5 sm:left-1 w-1.5 sm:w-2 h-px bg-violet-400/40" />
                </div>
              </div>
              
              {/* Download indicator */}
              <span className="text-xs sm:text-sm font-medium">Resume</span>
              <Download size={12} className="text-white/90 h-5 w-5 sm:h-6 sm:w-6 group-hover:text-white mt-3 sm:mt-5 transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Tooltip */}
          <div 
            className="absolute top-1/4 -left-1/4 transform -translate-x-1/2 px-2 sm:px-3 py-1 rounded-lg backdrop-blur-sm bg-black/80 text-white text-xs sm:text-sm font-medium border border-white/20 transition-all duration-300 pointer-events-none shadow-[0_4px_15px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 translate-y-0"
          >
            View / Download
            <div className="absolute top-full right-1/6 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </div>
        </div>
      </motion.div>
    </a>
  );
}