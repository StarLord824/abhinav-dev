"use client";
import Image from "next/image";
import { useCallback, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";

interface NavButtonProps {
  logoPath: string;
  text: string;
  isActive?: boolean;
  links: Link[];
  onClick?: () => void;
}

interface Link {
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
  const hasCalculatedPosition = useRef(false);

  const calculatePosition = useCallback(() => {
    if (!hasCalculatedPosition.current && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      setOpenOnLeft(rect.right > screenWidth * 0.6);
      hasCalculatedPosition.current = true;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (links.length > 0) {
      calculatePosition();
      setIsExpanded(true);
    }
    onClick?.();
  }, [links.length, onClick, calculatePosition]);

  const handleMouseLeave = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const handleLinkClick = useCallback((url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Memoize class names to prevent recalculation
  const buttonClasses = useMemo(() => 
    `relative group cursor-pointer ${isActive ? "scale-105" : ""}`,
    [isActive]
  );

  const glowClasses = useMemo(() => 
    `absolute inset-0 rounded-xl blur-sm transition-opacity duration-200 bg-violet-400/20 ${
      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
    }`,
    [isActive]
  );

  const containerClasses = useMemo(() => 
    `relative flex flex-col justify-center items-center h-20 w-20 md:h-24 md:w-24 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
      isActive
        ? "bg-gradient-to-br from-black/30 via-violet-500/20 to-black/35 border-violet-400/60 shadow-lg shadow-violet-500/30"
        : "bg-gradient-to-br from-black/20 via-black/25 to-black/30 border-white/10 group-hover:border-violet-400/40 group-hover:shadow-md group-hover:shadow-violet-500/20"
    }`,
    [isActive]
  );

  const imageClasses = useMemo(() => 
    `object-contain transition-all duration-200 ${
      isActive
        ? "brightness-110 saturate-110 drop-shadow-[0_2px_6px_rgba(164,112,227,0.4)]"
        : "brightness-90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] group-hover:brightness-105"
    }`,
    [isActive]
  );

  const textClasses = useMemo(() => 
    `absolute bottom-2 flex justify-center items-center text-center text-[10px] md:text-xs z-10 font-medium transition-all duration-200 ${
      isActive
        ? "text-white font-semibold drop-shadow-[0_2px_4px_rgba(164,112,227,0.6)]"
        : "text-white/80 group-hover:text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
    }`,
    [isActive]
  );

  return (
    <div 
      ref={containerRef}
      className="relative" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={buttonRef}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Simplified glow effect */}
        <div className={glowClasses} />

        {/* Main button container */}
        <div className={containerClasses}>
          {/* Simplified top highlight */}
          <div className="absolute top-2 left-2 right-2 h-6 rounded-lg bg-gradient-to-b from-white/15 to-transparent opacity-60" />

          <div className="absolute top-3 z-10 flex justify-center items-center w-16">
            <Image
              src={logoPath}
              alt={`${text} icon`}
              width={38}
              height={38}
              // rotate image by 6 degrees
              className={imageClasses + " rotate-6"}
              priority
            />
          </div>

          {/* Text */}
          <div className={textClasses}>
            {text}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && links.length > 0 && (
          <motion.div
            className={`absolute top-12 z-50 min-w-[200px] md:min-w-[250px] lg:min-w-[280px] ${
              openOnLeft ? 'right-full mr-2' : 'left-full ml-2'
            }`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="backdrop-blur-md bg-black/85 rounded-xl border-2 border-violet-400/30 overflow-hidden shadow-xl shadow-black/50">
              {/* Header */}
              <div className="px-4 py-2.5 border-b border-violet-400/20 bg-gradient-to-r from-violet-500/15 to-purple-600/15">
                <h3 className="text-base font-semibold text-white">{text} Links</h3>
              </div>

              {/* Links */}
              <div className="py-1">
                {links.map((link, index) => (
                  <motion.button
                    key={`${link.url}-${index}`}
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors duration-150 hover:bg-violet-500/20 group/link"
                    onClick={(e) => handleLinkClick(link.url, e)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, type: "tween" }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Link icon or bullet */}
                    {link.icon ? (
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover/link:bg-cyan-400 transition-colors" />
                    )}

                    {/* Link label */}
                    <span className="text-sm text-white/80 group-hover/link:text-white transition-colors font-medium">
                      {link.label}
                    </span>

                    {/* External link indicator */}
                    <svg
                      className="w-3 h-3 ml-auto text-white/40 group-hover/link:text-white/70 transition-colors"
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
              <div className="h-0.5 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
