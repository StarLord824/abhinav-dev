'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface XpButtonProps {
  text: string;
  amount: string;
  logo: string;
  isHighlighted?: boolean;
}

export default function XpButton({ text, amount, logo, isHighlighted = false }: XpButtonProps) {
  const [displayAmount, setDisplayAmount] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);

  // Calculate fill percentage based on the type
  const fillPercentage = useMemo(() => {
    if (text === 'XP') return 25; // 2 years out of ~20 year career
    if (text === 'PoW') return 65; // 20+ projects is substantial
    return 50; // default fallback
  }, [text]);

  // Animate the counter on mount
  useEffect(() => {
    if (hasAnimated) return;
    
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    
    // Extract numeric value from amount string (e.g., "2 Years" -> "2", "20+ Projects" -> "20")
    const numericMatch = amount.match(/\d+/);
    const targetValue = numericMatch ? parseInt(numericMatch[0]) : 0;
    const suffix = amount.replace(/\d+/, '').trim();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * targetValue);
      
      setDisplayAmount(currentValue + (suffix ? ' ' + suffix : ''));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };
    
    requestAnimationFrame(animate);
  }, [amount, hasAnimated]);

  // Memoize class names for performance
  const glowClasses = useMemo(() => 
    `absolute inset-0 rounded-2xl blur-md transition-opacity duration-200 ${
      isHighlighted 
        ? 'bg-gradient-to-br from-violet-400/30 via-purple-500/20 to-indigo-500/25 opacity-100'
        : 'bg-gradient-to-r from-violet-400/15 via-purple-500/20 to-indigo-500/15 opacity-0 group-hover:opacity-100'
    }`,
    [isHighlighted]
  );

  const logoContainerClasses = useMemo(() =>
    `absolute w-12 h-12 rounded-xl backdrop-blur-sm border-2 transition-all duration-200 bg-gradient-to-br ${
      isHighlighted
        ? 'from-white/25 via-white/20 to-white/15 border-violet-300/50 shadow-lg shadow-violet-400/40'
        : 'from-white/15 via-white/10 to-white/8 border-white/25 group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/15 group-hover:border-violet-300/40 group-hover:shadow-md group-hover:shadow-violet-400/30'
    }`,
    [isHighlighted]
  );

  const logoClasses = useMemo(() =>
    `relative z-10 object-contain p-2 transition-all duration-200 ${
      isHighlighted
        ? 'brightness-110 saturate-110 drop-shadow-[0_2px_6px_rgba(164,112,227,0.5)]'
        : 'brightness-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:brightness-105 group-hover:saturate-105'
    }`,
    [isHighlighted]
  );

  const textOverlayClasses = useMemo(() =>
    `absolute inset-0 flex items-center justify-center z-30 pointer-events-none transition-all duration-200 tracking-widest text-xs font-semibold ${
      isHighlighted
        ? 'text-white drop-shadow-[0_2px_4px_rgba(164,112,227,0.6)]'
        : 'text-white/80 group-hover:text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
    }`,
    [isHighlighted]
  );

  const amountContainerClasses = useMemo(() =>
    `absolute inset-0 rounded-xl border-2 transition-all duration-200 bg-gradient-to-br overflow-hidden ${
      isHighlighted
        ? 'from-black/50 via-black/55 to-black/60 border-violet-400/40 shadow-md shadow-violet-500/20'
        : 'from-black/40 via-black/45 to-black/50 border-black/60 group-hover:from-black/50 group-hover:via-black/55 group-hover:to-black/60 group-hover:border-violet-400/30'
    }`,
    [isHighlighted]
  );

  const amountTextClasses = useMemo(() =>
    `relative z-20 font-bold transition-all duration-200 text-base ${
      isHighlighted
        ? 'text-white drop-shadow-[0_2px_4px_rgba(164,112,227,0.5)]'
        : 'text-white/85 group-hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
    }`,
    [isHighlighted]
  );

  return (
    <motion.div 
      className="relative group flex gap-5 items-center w-72 h-16"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Simplified Glow */}
      <div className={glowClasses} />

      {/* Logo Container */}
      <div className="relative z-20 flex items-center justify-center w-12 h-12">
        {/* Background */}
        <div className={logoContainerClasses}>
          {/* Top highlight */}
          <div className="absolute top-1 left-1 right-1 h-4 rounded-lg bg-gradient-to-b from-white/20 via-white/10 to-transparent opacity-60" />
        </div>

        {/* Logo */}
        <Image
          src={logo}
          alt={`${text} experience icon`} 
          width={48}
          height={48}
          className={logoClasses}
          priority
        />

        {/* Text Overlay */}
        <div className={textOverlayClasses}>
          {text}
        </div>
      </div>

      {/* Amount Container */}
      <div className="relative ml-5 flex justify-center items-center h-4/5 rounded-xl overflow-hidden w-56">
        <div className={amountContainerClasses}>
          {/* Animated Filling Bar */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-600/40 via-purple-500/30 to-violet-600/40"
            initial={{ width: 0 }}
            animate={{ width: `${fillPercentage}%` }}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1], // Custom ease-out curve
              delay: 0.2 
            }}
          >
            {/* Shimmer effect on the filling bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </motion.div>

          {/* Inner highlight */}
          <div className="absolute top-1 left-2 right-2 h-3 rounded-lg bg-gradient-to-b from-white/10 to-transparent opacity-40 z-10" />
        </div>

        <div className={amountTextClasses}>
          {displayAmount}
        </div>
      </div>
    </motion.div>
  );
}
