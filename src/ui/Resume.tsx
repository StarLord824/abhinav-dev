'use client'
import React from 'react';
import { Download } from 'lucide-react';

export default function Floating2DResumeObject() {
  const handleResumeDownload = () => {
    // Replace with your actual resume file path
    const resumePath = '/resume/Abhinav_Shukla_Resume.pdf';
    
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Abhinav_Shukla_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="absolute top-11/20 right-1/13 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer group"
      onClick={handleResumeDownload}
      style={{
        animation: 'float 4s ease-in-out infinite',
        perspective: '1000px'
      }}
    >
      {/* 2.5D Floating Object Container */}
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-violet-500/30 to-pink-500/20 rounded-3xl blur-xl scale-150 group-hover:scale-175 transition-transform duration-500"></div>
        
        {/* Main 2.5D Object */}
        <div 
          className="relative bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-white/50"
          style={{
            width: '160px',
            height: '200px',
            transform: 'rotateX(15deg) rotateY(-15deg)',
            animation: 'rotate3d 6s linear infinite'
          }}
        >
          {/* Top face gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-violet-400/80 via-purple-500/90 to-indigo-600/80 rounded-2xl"
            style={{
              transform: 'translateZ(8px)',
              clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)'
            }}
          ></div>
          
          {/* Side faces for 2.5D effect */}
          <div 
            className="absolute bg-gradient-to-b from-violet-600/60 to-purple-800/80 rounded-r-2xl"
            style={{
              width: '8px',
              height: '100%',
              right: '-8px',
              top: '0',
              transform: 'rotateY(90deg) translateZ(4px)'
            }}
          ></div>
          
          <div 
            className="absolute bg-gradient-to-r from-indigo-600/60 to-purple-700/80 rounded-b-2xl"
            style={{
              width: '100%',
              height: '8px',
              bottom: '-8px',
              left: '0',
              transform: 'rotateX(90deg) translateZ(4px)'
            }}
          ></div>
          
          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-3 text-white">
            {/* Document icon representation */}
            <div className="mb-1">
              <div className="w-6 h-8 bg-white/90 rounded-sm shadow-inner relative">
                <div className="absolute top-0 right-0 w-2 h-2 bg-violet-300 transform rotate-45 origin-bottom-left"></div>
                <div className="absolute top-2 left-1 right-1 h-px bg-violet-400/60"></div>
                <div className="absolute top-3 left-1 right-1 h-px bg-violet-400/40"></div>
                <div className="absolute top-4 left-1 w-2 h-px bg-violet-400/40"></div>
              </div>
            </div>
            
            {/* Download indicator */}
            <Download size={12} className="text-white/90 group-hover:text-white transition-colors duration-300" />
          </div>
          
          {/* Highlight effects */}
          <div className="absolute top-2 left-2 w-6 h-1 bg-white/40 rounded-full blur-sm"></div>
          <div className="absolute top-1 right-3 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-4 -left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-60"
             style={{ animation: 'particle-float 3s ease-in-out infinite 0.5s' }}></div>
        <div className="absolute -bottom-2 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40"
             style={{ animation: 'particle-float 4s ease-in-out infinite 1s' }}></div>
        <div className="absolute top-6 -right-4 w-0.5 h-0.5 bg-violet-400 rounded-full opacity-70"
             style={{ animation: 'particle-float 2.5s ease-in-out infinite 1.5s' }}></div>
      </div>
      
      {/* Enhanced tooltip with 2.5D effect */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div 
          className="bg-gradient-to-br from-slate-800 to-slate-900 text-white text-sm px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl"
          style={{
            transform: 'translateZ(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          Download Resume
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-800"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) rotateY(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-8px) rotateY(5deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-12px) rotateY(0deg);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-8px) rotateY(-5deg);
          }
        }
        
        @keyframes rotate3d {
          0% {
            transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
          }
          25% {
            transform: rotateX(20deg) rotateY(-10deg) rotateZ(2deg);
          }
          50% {
            transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
          }
          75% {
            transform: rotateX(10deg) rotateY(-20deg) rotateZ(-2deg);
          }
          100% {
            transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
          }
        }
        
        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}