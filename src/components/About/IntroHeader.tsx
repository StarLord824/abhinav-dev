'use client';
import { motion } from 'motion/react';

export default function IntroHeader() {

  return (
    <div className="relative mb-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-purple-500/5 rounded-3xl blur-3xl" />
      
      <div className="relative">
        {/* Top Section - Level Badge & Personal Note */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Left: Level Badge & Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="relative bg-gradient-to-br from-slate-900/60 via-purple-900/30 to-slate-900/60 rounded-2xl border-2 border-purple-400/30 p-6 backdrop-blur-md overflow-hidden">
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full" />
              
              <div className="relative z-10">
                {/* Level Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full border-2 border-purple-400/50"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse" />
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Level 25 Developer
                  </span>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
                </motion.div>

                {/* Personal Note */}
                <div className="relative">
                  <div className="absolute -left-2 top-0 text-5xl text-purple-400/10 font-serif leading-none">&ldquo;</div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed italic pl-6">
                    I love building systems from scratch — from UI interactions to backend architectures. 
                    Currently exploring <span className="text-cyan-300 font-semibold">Rust</span>, <span className="text-purple-300 font-semibold">distributed systems</span>, and <span className="text-pink-300 font-semibold">GenAI engineering</span>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Graduating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-64"
          >
            <div className="h-full bg-gradient-to-br from-slate-900/60 via-cyan-900/30 to-slate-900/60 rounded-2xl border-2 border-cyan-400/30 p-6 backdrop-blur-md flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-400 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-cyan-400 rounded-full" />
              </motion.div>

              <div className="relative z-10">
                <div className="text-4xl mb-2">🎓</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent mb-1">
                  2026
                </div>
                <div className="text-sm text-gray-300">Graduating Year</div>
                
                {/* Progress bar */}
                <div className="mt-4 w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">85% Complete</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
