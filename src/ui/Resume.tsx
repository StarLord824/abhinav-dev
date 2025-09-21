'use client'
import React from 'react';
import { motion, Variants } from 'motion/react';
import { Download } from 'lucide-react';

export default function Floating2DResumeObject() {

  // Animation variants
  const floatAnimation : Variants = {
    animate: {
      y: [0, -8, -12, -8, 0],
      rotateY: [0, 5, 0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotate3dAnimation: Variants = {
    animate: {
      rotateX: [15, 20, 15, 10, 15],
      rotateY: [-15, -10, -15, -20, -15],
      rotateZ: [0, 2, 0, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const particleFloat : Variants= {
    animate: {
      y: [0, -15, 0],
      x: [0, 5, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleFloat2: Variants = {
    animate: {
      y: [0, -15, 0],
      x: [0, 5, 0],
      opacity: [0.3, 0.8, 0.3],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  const particleFloat3: Variants = {
    animate: {
      y: [0, -15, 0],
      x: [0, 5, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }
    }
  };
  const resumePath : string = "https://drive.google.com/file/d/1bpiWu4I7yTRPAXzNa5y_CsGbCHN7FwHb/view?usp=drive_link";
  return (
    <a href={resumePath} target="_blank" rel="noopener noreferrer">
      <motion.div 
        className="absolute top-1/2 right-1/10 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer group [perspective:1000px]"
        variants={floatAnimation}
        animate="animate"
        // style={{ perspective: '1000px' }}
      >
        {/* 2.5D Floating Object Container */}
        <div className="relative [transform-style:preserve-3d]" 
          // style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* Ambient glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-violet-500/30 to-pink-500/20 rounded-3xl blur-xl"
            initial={{ scale: 1.5 }}
            whileHover={{ scale: 1.75 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Main 2.5D Object */}
          <motion.div 
            className="relative bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-2xl shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 h-[200px] w-[160px]"
            variants={rotate3dAnimation}
            animate="animate"
            initial={{
              rotateX: 15,
              rotateY: -15
            }}
          >
            {/* Top face gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-violet-400/80 via-purple-500/90 to-indigo-600/80 rounded-2xl [transform:translateZ(8px)] [clip-path:polygon(0_0,_100%_0,_90%_100%,_10%_100%)]"
              // style={{
              //   transform: 'translateZ(8px)',
              //   clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
              // }}
            />
            
            {/* Side faces for 2.5D effect */}
            <div 
              className="absolute bg-gradient-to-b from-violet-600/60 to-purple-800/80 rounded-r-2xl right-[-8px] top-0 h-full w-2 [transform:rotateY(90deg)_translateZ(4px)]"
              // style={{
              //   width: '8px',
              //   height: '100%',
              //   right: '-8px',
              //   top: '0',
              //   transform: 'rotateY(90deg) translateZ(4px)'
              // }}
            />
            
            <div 
              className="absolute bg-gradient-to-r from-indigo-600/60 to-purple-700/80 rounded-b-2xl right-[-8px] top-0 h-full w-2 [transform:rotateY(90deg)_translateZ(4px)]"
              // style={{
              //   width: '100%',
              //   height: '8px',
              //   bottom: '-8px',
              //   left: '0',
              //   transform: 'rotateX(90deg) translateZ(4px)'
              // }}
            />
            
            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-3 text-white">
              {/* Document icon representation */}
              <div className="mb-1">
                <div className="w-6 h-8 bg-white/90 rounded-sm shadow-inner relative">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-violet-300 transform rotate-45 origin-bottom-left" />
                  <div className="absolute top-2 left-1 right-1 h-px bg-violet-400/60" />
                  <div className="absolute top-3 left-1 right-1 h-px bg-violet-400/40" />
                  <div className="absolute top-4 left-1 w-2 h-px bg-violet-400/40" />
                </div>
              </div>
              
              {/* Download indicator */}
              Resume 
              <Download size={12} className="text-white/90 h-6 w-6 group-hover:text-white mt-5 transition-colors duration-300" />
            </div>
            
            {/* Highlight effects */}
            {/* <div className="absolute top-2 left-2 w-6 h-1 bg-white/40 rounded-full blur-sm" />
            <div className="absolute top-1 right-3 w-2 h-2 bg-white/30 rounded-full blur-sm" /> */}
          </motion.div>
          
          {/* Floating particles */}
          <motion.div 
            className="absolute -top-4 -left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            variants={particleFloat}
            animate="animate"
          />
          <motion.div 
            className="absolute -bottom-2 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40"
            variants={particleFloat2}
            animate="animate"
          />
          <motion.div 
            className="absolute top-6 -right-4 w-0.5 h-0.5 bg-violet-400 rounded-full opacity-70"
            variants={particleFloat3}
            animate="animate"
          />
        </div>
        
        {/* Enhanced tooltip with 2.5D effect */}
        {/* <motion.div 
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="bg-gradient-to-br from-slate-800 to-slate-900 text-white text-sm px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl [transform:translateZ(10px)] [box-shadow:0_8px_32px_rgba(0,0,0,0.3),_inset_0_1px_0_rgba(255,255,255,0.1)]"
            // style={{
            //   transform: 'translateZ(10px)',
            //   boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            // }}
          >
            Download Resume
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-800" />
          </div>
        </motion.div> */}
      </motion.div>
    </a>
  );
}