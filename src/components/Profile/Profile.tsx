'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function Profile() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [particles, setParticles] = useState< Particle[] >([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2000
    }));
    setParticles(newParticles);
  }, []);

  const skills = [
    { name: 'C++', icon: '/langs/cpp.svg', size: 50, color: 'from-blue-400 to-purple-600' },
    { name: 'TypeScript', icon: '/langs/Typescript.svg', size: 38, color: 'from-blue-500 to-cyan-400' },
    { name: 'JavaScript', icon: '/langs/javascript.svg', size: 38, color: 'from-yellow-400 to-orange-500' },
    { name: 'Go', icon: '/langs/Go.svg', size: 70, color: 'from-cyan-400 to-blue-500' },
    { name: 'Java', icon: '/langs/java.svg', size: 50, color: 'from-orange-500 to-red-500' },
    { name: 'Python', icon: '/langs/python.svg', size: 45, color: 'from-green-400 to-blue-500' }
  ];

  return (
    <>
      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0px) rotateX(5deg) rotateY(-5deg); 
          }
          50% { 
            transform: translateY(-8px) rotateX(6deg) rotateY(-4deg); 
          }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) translateX(10px) rotate(180deg); 
            opacity: 0.8;
          }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        @keyframes banner-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(164,112,227,0.3), 0 0 40px rgba(164,112,227,0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(164,112,227,0.5), 0 0 60px rgba(164,112,227,0.2);
          }
        }
        
        .gentle-float {
          animation: gentle-float 6s ease-in-out infinite;
        }
        
        .particle-float {
          animation: particle-float 4s ease-in-out infinite;
        }
        
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .banner-glow {
          animation: banner-glow 3s ease-in-out infinite;
        }
      `}</style>

      <div 
        className="flex items-center relative top-32 -left-10 h-2/3 w-full perspective-1000" 
        id="profile"
        style={{ perspective: '1000px' }}
      >
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute particle-float"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}ms`,
                background: `radial-gradient(circle, rgba(164,112,227,0.6) 0%, rgba(139,69,196,0.3) 100%)`,
                borderRadius: '50%',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>

        <div 
          className="flex-col h-full w-4/5 gentle-float transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Profile Banner Image - Enhanced 2.5D */}
          <div className="relative group">
            {/* 3D Container with depth */}
            <div 
              className={`relative transform transition-all duration-700 ease-out ${
                isHovered ? 'scale-105 rotate-y-2 rotate-x-1' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 20px 40px rgba(164,112,227,0.3))'
              }}
            >
              {/* Main Banner with Glassmorphism */}
              <div className="relative overflow-hidden rounded-xl backdrop-filter backdrop-blur-sm bg-gradient-to-br from-white/10 via-purple-500/20 to-violet-600/30 border border-white/20">
                {/* Banner Image */}
                <div className="banner-glow">
                  <Image
                    src={'/banners/banner2.svg'}
                    alt="Aurora UI/UX Banner"
                    className="w-full h-auto object-cover"
                    height={1000}
                    width={1000}
                  />
                </div>
                
                {/* Depth Side Faces */}
                <div 
                  className="absolute top-0 right-0 w-4 h-full bg-gradient-to-r from-purple-600/60 to-purple-800/80 transform origin-left"
                  style={{ 
                    transform: 'rotateY(90deg) translateZ(2px)',
                    transformOrigin: 'left center'
                  }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-b from-purple-600/60 to-purple-800/80 transform origin-top"
                  style={{ 
                    transform: 'rotateX(-90deg) translateZ(2px)',
                    transformOrigin: 'top center'
                  }}
                />
                
                {/* Top Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 via-violet-400/20 to-white/20" />
                
                {/* Floating Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Pulse Ring on Hover */}
              {isHovered && (
                <div className="absolute inset-0 pulse-ring border-2 border-violet-400/50 rounded-xl" />
              )}
            </div>
          </div>

          {/* Profile Info Section - Enhanced */}
          <div 
            className={`flex justify-between items-start px-10 relative z-10 transform transition-all duration-600 ${
              isHovered ? 'translate-z-4 scale-102' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, 
                rgba(0,0,0,0.4) 0%, 
                rgba(164,112,227,0.2) 50%, 
                rgba(0,0,0,0.4) 100%)`,
              backdropFilter: 'blur(20px)',
              borderRadius: '0 12px 12px 0',
              boxShadow: `
                0 8px 32px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.1),
                0 0 20px rgba(164,112,227,0.3)
              `,
              border: '1px solid rgba(255,255,255,0.1)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Side depth effect */}
            <div 
              className="absolute top-0 right-0 w-3 h-full bg-gradient-to-r from-purple-600/40 to-purple-800/60"
              style={{ 
                transform: 'rotateY(90deg) translateZ(1px)',
                transformOrigin: 'left center'
              }}
            />

            {/* Profile Text */}
            <div className="flex flex-col py-4 z-20 ml-10">
              <h1 
                className={`font-bold text-2xl transition-all duration-500 ${
                  isHovered 
                    ? 'text-white drop-shadow-lg scale-105' 
                    : 'text-white/90'
                }`}
                style={{
                  textShadow: '0 0 20px rgba(164,112,227,0.5)'
                }}
              >
                Abhinav Shukla
              </h1>
              <h4 
                className={`font-semibold transition-all duration-500 ${
                  isHovered 
                    ? 'text-cyan-300 scale-102' 
                    : 'text-blue-300'
                }`}
                style={{
                  textShadow: '0 0 15px rgba(6,182,212,0.5)'
                }}
              >
                Full Stack Developer!
              </h4>
            </div>

            {/* Skills Section - Enhanced 2.5D */}
            <div className="flex gap-3 items-center justify-center py-4 z-20">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                    activeSkill === index ? 'scale-115' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transformStyle: 'preserve-3d'
                  }}
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {/* Skill Icon Container */}
                  <div 
                    className={`relative p-2 rounded-lg backdrop-filter backdrop-blur-sm border border-white/20 transition-all duration-500 group-hover:shadow-2xl ${
                      activeSkill === index 
                        ? 'bg-gradient-to-br from-violet-500/30 to-purple-600/40 shadow-lg shadow-violet-500/50' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    style={{
                      boxShadow: activeSkill === index 
                        ? '0 8px 25px rgba(164,112,227,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                        : '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* 3D Depth Effect */}
                    <div 
                      className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${skill.color} opacity-60`}
                      style={{ 
                        transform: 'rotateY(90deg) translateZ(1px)',
                        transformOrigin: 'left center'
                      }}
                    />
                    
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      height = {skill.size}
                      width = {skill.size}
                      style={{
                        filter: activeSkill === index 
                          ? 'drop-shadow(0 0 10px rgba(164,112,227,0.7))' 
                          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                      className="transition-all duration-300"
                    />

                    {/* Glow Effect on Active */}
                    {activeSkill === index && (
                      <>
                        <div className="absolute inset-0 pulse-ring border border-violet-400/60 rounded-lg" />
                        <div 
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `linear-gradient(45deg, transparent, rgba(164,112,227,0.3), transparent)`,
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      </>
                    )}
                  </div>

                  {/* Floating Tooltip */}
                  <div 
                    className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg backdrop-filter backdrop-blur-sm bg-black/80 text-white text-xs font-medium border border-white/20 transition-all duration-300 pointer-events-none ${
                      activeSkill === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    {skill.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Panel - Enhanced */}
        <div 
          className="flex flex-col justify-start items-center w-1/2 h-full relative z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className={`absolute flex gap-4 items-center transform transition-all duration-700 ${
              isHovered ? 'scale-105 translate-z-2' : ''
            }`}
          >
            {/* Placeholder for future content */}
            <div 
              className="px-6 py-3 rounded-xl backdrop-filter backdrop-blur-sm bg-gradient-to-br from-white/10 to-purple-500/20 border border-white/20 text-white font-medium shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              style={{
                boxShadow: '0 8px 25px rgba(164,112,227,0.2)'
              }}
            >
            </div>
          </div>
        </div>
      </div>
    </>
  );
}