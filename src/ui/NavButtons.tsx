"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface NavButtonProps {
  logoPath: string;
  text: string;
  isActive?: boolean;
  links: Link[];
  onClick?: () => void;
}

interface Link{
  label: string;
  url: string;
  icon?: string;
}

export default function NavButton({
  logoPath,
  text,
  isActive = false,
  links = [],
  onClick,
}: NavButtonProps) {

  const [isExpanded, setIsExpanded] = useState(false);
  
  const [openOnLeft, setOpenOnLeft] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      // If button is in right 40% of screen, open list on left
      setOpenOnLeft(rect.right > screenWidth * 0.6);
    }
  }, []);
  
  const handleClick = () => {
    if(links.length > 0){
      setIsExpanded(!isExpanded);
    }
    onClick?.();
  }

  const handleMouseLeave = () => {
    setIsExpanded(false);
  }

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      ref={containerRef}
      className="relative" 
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={buttonRef}
        className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 [perspective:1000px] ${
          isActive ? "scale-110" : ""
        }`}
        onHoverStart={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        >
        {/* Ambient glow effect */}
        <div
          className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 
            bg-gradient-to-br from-violet-400/20 via-violet-400/15 to-purple-500/20 
            ${isActive 
              ? "scale-110"
              : "group-hover:scale-105 group-hover:from-violet-400/25 group-hover:via-violet-500/20 group-hover:to-purple-600/25"
              }
          `}
          />

        {/* Main button container with 3D effect */}
        <div
          className={`relative flex flex-col justify-center items-center h-24 w-24 rounded-xl border-2 transition-all duration-300 overflow-hidden 
                  ${
                    isActive
                      ? "bg-gradient-to-br from-black/25 via-violet-500/15 to-black/30 border-violet-400/50 shadow-[0_8px_32px_rgba(164,112,227,0.3),_inset_0_1px_0_rgba(255,255,255,0.1)] [transform:rotateX(5deg)_rotateY(-5deg)] [transform-style:preserve-3d]"
                      : "bg-gradient-to-br from-black/15 via-black/20 to-black/25 border-black/20 30 group-hover:from-black/20 group-hover:via-black/25 group-hover:to-black/30 [transform:rotateX(5deg)_rotateY(-5deg)] [transform-style:preserve-3d] shadow-[0_4px_16px_rgba(0,0,0,0.2),_inset_0_1px_0_rgba(255,255,255,0.05)]"
                    }`}
        >
          {/* Top highlight */}
          <div
            className={`absolute top-2 left-2 right-2 h-8 rounded-lg transition-all duration-300 bg-gradient-to-r from-white/20 via-white/15 to-white/10 group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/15 [translateZ:2px]`}
            />

          {/* Side depth effects */}
          {/* <div className={`absolute right-[-2px] top-0 bottom-0 w-1 rounded-r-lg transition-colors duration-300 ${
                      isActive 
                          ? 'bg-gradient-to-b from-violet-400/40 to-purple-700/60 [rotateY(90deg)_translateZ(1px)]' 
                          : 'bg-gradient-to-b from-black/30 to-black/50 [rotateY(90deg)_translateZ(1px)]'
                  }`} /> */}

          {/* <div className={`absolute bottom-[-2px] left-0 right-0 h-1 rounded-b-lg transition-colors duration-300 ${
                      isActive 
                          ? 'bg-gradient-to-r from-violet-400/40 to-purple-700/60 [rotateX(90deg)_translateZ(1px)]' 
                          : 'bg-gradient-to-r from-black/30 to-black/50 [rotateX(90deg)_translateZ(1px)]'
                  }`} /> */}

          {/* Logo container */}
          <div
            className={`absolute top-3 z-10 flex justify-center items-center w-16 mb-1 rounded-lg transition-all duration-300`}
            >
            <Image
              src={logoPath}
              alt={`${text} icon`}
              width={38}
              height={38}
              className={`object-contain transition-all duration-300 rotate-6 ${
                isActive
                ? "brightness-[1.1] saturate-[1.1] drop-shadow-[0_2px_4px_rgba(164,112,227,0.3)]"
                : "brightness-[0.9] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:brightness-[1.05]"
                }`}
                />
          </div>

          {/* Text */}
          <div
            className={`absolute top-15 mt-0.5 flex justify-center items-center text-center text-xs z-10 font-medium transition-all duration-300 ${
              isActive
              ? "text-white font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.8),_0_0_8px_rgba(164,112,227,0.4)]"
              : "text-white/80 group-hover:text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]"
              }`}
              >
            {text}
          </div>

          {/* {links.length > 0 && (
            <motion.div
              className="absolute -bottom-1 right-1 w-4 h-4 flex items-center justify-center bg-violet-500/80 rounded-full"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={12} className="text-white" />
            </motion.div>
          )} */}

          {/* Active indicator */}
          {/* {isActive && (
                      <div className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent rounded-full opacity-80" />
                  )} */}

          {/* Static micro-particles */}
          {/* {isActive && (
                      <>
                      <div className="absolute -top-1 -left-1 w-1 h-1 bg-violet-400/60 rounded-full" />
                      <div className="absolute -bottom-1 -right-1 w-0.5 h-0.5 bg-violet-400/60 rounded-full" />
                      <div className="absolute top-2 -right-2 w-0.5 h-0.5 bg-purple-400/60 rounded-full" />
                      </>
                      )} */}

          {/* Hover shimmer */}
          <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 translate-x-2 w-[40%] h-full" />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && links.length > 0 && (
          <motion.div
            className={`absolute top-5 z-50 min-w-[200px] ${
              openOnLeft ? 'right-full mr-4' : 'left-full ml-4'
            }`}
            initial={{ opacity: 1, x: openOnLeft ? 20 : -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: openOnLeft ? 20 : -20, scale: 0.9 }}
            transition={{ type: "tween", ease: "easeInOut", duration : 0.5 }}
          >
            <div
              className="backdrop-blur-md rounded-xl border-2 border-violet-400/30 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0,0,0,0.8) 0%, 
                  rgba(164,112,227,0.15) 50%, 
                  rgba(0,0,0,0.9) 100%)`,
                boxShadow: `
                  0 10px 30px rgba(0,0,0,0.5),
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 0 20px rgba(164,112,227,0.3)
                `,
              }}
            >
              {/* Header */}
              <div className="px-4 py-2 border-b border-violet-400/20 bg-gradient-to-r from-violet-500/20 to-purple-600/20">
                <h3 className="text-sm font-semibold text-white">{text} Links</h3>
              </div>

              {/* Links */}
              <div className="py-2">
                {links.map((link, index) => (
                  <motion.button
                    key={index}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-200 hover:bg-violet-500/20 group/link"
                    onClick={(e) => handleLinkClick(link.url, e)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Link icon or bullet */}
                    {link.icon ? (
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-violet-400 group-hover/link:bg-cyan-400 transition-colors" />
                    )}

                    {/* Link label */}
                    <span className="text-sm text-white/80 group-hover/link:text-white transition-colors font-medium">
                      {link.label}
                    </span>

                    {/* External link indicator */}
                    <svg
                      className="w-3 h-3 ml-auto text-white/40 group-hover/link:text-white/80 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="h-1 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
