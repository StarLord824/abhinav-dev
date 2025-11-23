'use client'
import Image from 'next/image';
import { useState } from 'react';

export default function Profile() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const skills = [
    { name: 'C++', icon: '/langs/cpp.svg', size: 50 },
    { name: 'TypeScript', icon: '/langs/typescript.svg', size: 38 },
    { name: 'JavaScript', icon: '/langs/javascript.svg', size: 38 },
    { name: 'Go', icon: '/langs/Go.svg', size: 70 },
    { name: 'Java', icon: '/langs/java.svg', size: 50 },
    { name: 'Python', icon: '/langs/python.svg', size: 45 }
  ];

  return (
    <div 
      id="profile"
      className="flex items-center relative top-38 -left-8 h-2/3 w-3/5 [perspective:1000px]"
    >
      {/* Outer container disables pointer events */}
      <div 
        className="flex-col h-full w-full [transform-style:preserve-3d] [transform:rotateX(5deg)_rotateY(-5deg)] pointer-events-none"
      >
        {/* Profile Banner Image - 3D */}
        <div 
          className="relative group pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className={`relative transform transition-all duration-300 [transform-style:preserve-3d] ${
              isHovered 
                ? 'scale-105 [transform:rotateY(2deg)_rotateX(1deg)]' 
                : '[transform:rotateY(0deg)_rotateX(0deg)]'
            }`}
          >
            {/* Main Banner with Glassmorphism */}
            <div className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/10 via-purple-500/20 to-violet-600/30 border border-white/20 shadow-2xl">
              <Image
                src={'/banners/banner2.svg'}
                alt="Aurora UI/UX Banner"
                className="w-full h-auto object-cover"
                height={1000}
                width={1000}
              />
              
              {/* Depth Side Faces */}
              <div 
                className="absolute top-0 right-0 w-4 h-full bg-gradient-to-r from-purple-600/60 to-purple-800/80 [transform:rotateY(90deg)_translateZ(2px)] [transform-origin:left_center]"
              />
              <div 
                className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-b from-purple-600/60 to-purple-800/80 [transform:rotateX(-90deg)_translateZ(2px)] [transform-origin:top_center]"
              />
              
              {/* Top Highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 via-violet-400/20 to-white/20" />
              
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-violet-600/20 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>

            {/* Hover Border Ring */}
            {isHovered && (
              <div className="absolute inset-0 border-2 border-violet-400/50 rounded-xl scale-110" />
            )}
          </div>
        </div>

        {/* Profile Info Section */}
        <div 
          className={`flex justify-between items-start px-10 relative z-10 transform transition-all duration-300 rounded-r-xl border border-white/10 backdrop-blur-[20px] bg-[linear-gradient(135deg,rgba(0,0,0,0.4)_0%,rgba(164,112,227,0.2)_50%,rgba(0,0,0,0.4)_100%)] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(164,112,227,0.3)] [transform-style:preserve-3d] pointer-events-auto ${
            isHovered 
              ? 'scale-105 [transform:translateZ(4px)_scale(1.02)]' 
              : '[transform:translateZ(0px)]'
          }`}
        >
          {/* Side depth effect */}
          <div 
            className="absolute top-0 right-0 w-3 h-full bg-gradient-to-r from-purple-600/40 to-purple-800/60 [transform:rotateY(90deg)_translateZ(1px)] [transform-origin:left_center]"
          />

          {/* Profile Text */}
          <div className="flex flex-col py-4 z-20 ml-10">
            <h1 
              className={`font-bold text-2xl transition-all duration-300 [text-shadow:0_0_20px_rgba(164,112,227,0.5)] ${
                isHovered 
                  ? 'text-white drop-shadow-lg scale-105' 
                  : 'text-white/90'
              }`}
            >
              Abhinav Shukla
            </h1>
            <h4 
              className={`font-semibold transition-all duration-300 [text-shadow:0_0_15px_rgba(6,182,212,0.5)] ${
                isHovered 
                  ? 'text-cyan-300 scale-105' 
                  : 'text-blue-300'
              }`}
            >
              Full Stack Developer!
            </h4>
          </div>

          {/* Skills Section */}
          <div className="flex gap-3 items-center justify-center py-4 z-20">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-110 [transform-style:preserve-3d] ${
                  activeSkill === index ? 'scale-115' : ''
                }`}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                {/* Skill Icon Container */}
                <div 
                  className={`relative p-2 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                    activeSkill === index 
                      ? 'bg-gradient-to-br from-violet-500/30 to-purple-600/40 shadow-2xl [box-shadow:0_8px_25px_rgba(164,112,227,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]' 
                      : 'bg-white/10 hover:bg-white/20 shadow-lg [box-shadow:0_4px_15px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]'
                  }`}
                >
                  {/* 3D Depth Effect */}
                  <div 
                    className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-violet-400 to-purple-600 opacity-60 [transform:rotateY(90deg)_translateZ(1px)] [transform-origin:left_center]"
                  />
                  
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    height={skill.size}
                    width={skill.size}
                    className={`transition-all duration-300 ${
                      activeSkill === index 
                        ? 'drop-shadow-lg brightness-110 [filter:drop-shadow(0_0_10px_rgba(164,112,227,0.7))]' 
                        : 'drop-shadow-md [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))]'
                    }`}
                  />

                  {/* Active Border Ring */}
                  {activeSkill === index && (
                    <div className="absolute inset-0 border-2 border-violet-400/60 rounded-lg scale-110" />
                  )}
                </div>

                {/* Floating Tooltip */}
                <div 
                  className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg backdrop-blur-sm bg-black/80 text-white text-xs font-medium border border-white/20 transition-all duration-300 pointer-events-none shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${
                    activeSkill === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {skill.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
