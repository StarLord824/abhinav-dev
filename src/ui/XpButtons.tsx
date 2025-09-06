'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface XpButtonProps {
    text: string;
    amount: string;
    logo: string;
    isHighlighted?: boolean;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    color: string;
}

export default function XpButton({ text, amount, logo, isHighlighted = false }: XpButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState< Particle[] >([]);
    const [fillProgress, setFillProgress] = useState(0);

    // Generate floating particles for highlighted state
    useEffect(() => {
        if (isHighlighted) {
            const newParticles = Array.from({ length: 15 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                delay: Math.random() * 2000,
                color: ['violet', 'purple', 'cyan', 'emerald'][Math.floor(Math.random() * 4)]
            }));
            setParticles(newParticles);
            
            // Animate fill progress
            const timer = setTimeout(() => {
                setFillProgress(100);
            }, 300);
            
            return () => clearTimeout(timer);
        } else {
            setFillProgress(0);
        }
    }, [isHighlighted]);

    return (
        <>
            {/* Enhanced Keyframe Animations */}
            <style jsx>{`
                @keyframes gentle-float {
                    0%, 100% { 
                        transform: translateY(0px) rotateX(2deg) rotateY(-1deg) translateZ(0px); 
                    }
                    50% { 
                        transform: translateY(-12px) rotateX(3deg) rotateY(-2deg) translateZ(5px); 
                    }
                }
                
                @keyframes gentle-sway {
                    0%, 100% {
                        transform: translateY(0px) rotateZ(0deg);
                    }
                    25% {
                        transform: translateY(-2px) rotateZ(1deg);
                    }
                    50% {
                        transform: translateY(-4px) rotateZ(0deg);
                    }
                    75% {
                        transform: translateY(-2px) rotateZ(-1deg);
                    }
                }
                
                @keyframes particle-orbit {
                    0% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.8); 
                        opacity: 0.4;
                    }
                    50% { 
                        transform: translateY(-25px) translateX(15px) rotate(180deg) scale(1.2); 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(-50px) translateX(30px) rotate(360deg) scale(0.6); 
                        opacity: 0;
                    }
                }
                
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 1; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                
                @keyframes shimmer-sweep {
                    0% { transform: translateX(-150%) skewX(-20deg); }
                    100% { transform: translateX(250%) skewX(-20deg); }
                }
                
                @keyframes glow-pulse {
                    0%, 100% { 
                        filter: drop-shadow(0 0 20px rgba(164,112,227,0.4)) drop-shadow(0 0 40px rgba(164,112,227,0.2));
                    }
                    50% { 
                        filter: drop-shadow(0 0 30px rgba(164,112,227,0.7)) drop-shadow(0 0 60px rgba(164,112,227,0.4));
                    }
                }
                
                @keyframes fill-animation {
                    0% { width: 0%; opacity: 0; }
                    10% { width: 0%; opacity: 1; }
                    100% { width: 100%; opacity: 0.85; }
                }
                
                @keyframes logo-glow {
                    0%, 100% { 
                        box-shadow: inset 0 1px 3px rgba(255,255,255,0.3), 0 0 15px rgba(164,112,227,0.4);
                    }
                    50% { 
                        box-shadow: inset 0 1px 3px rgba(255,255,255,0.5), 0 0 25px rgba(164,112,227,0.7);
                    }
                }
                
                .gentle-float {
                    animation: gentle-float 6s ease-in-out infinite;
                }
                
                .gentle-sway {
                    animation: gentle-sway 5s ease-in-out infinite;
                }
                
                .particle-orbit {
                    animation: particle-orbit 3s ease-out infinite;
                }
                
                .pulse-ring {
                    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .shimmer-sweep {
                    animation: shimmer-sweep 2s ease-in-out infinite;
                }
                
                .glow-pulse {
                    animation: glow-pulse 2.5s ease-in-out infinite;
                }
                
                .fill-animation {
                    animation: fill-animation 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .logo-glow {
                    animation: logo-glow 3s ease-in-out infinite;
                }
            `}</style>

            <div 
                className={`relative group flex gap-5 items-center w-72 h-16 transition-all duration-700 ${
                    isHighlighted ? 'scale-110 gentle-float' : 'gentle-sway hover:scale-105'
                }`}
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Enhanced Floating Particles for Highlighted State */}
                {isHighlighted && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {particles.map((particle) => (
                            <div
                                key={particle.id}
                                className="absolute particle-orbit rounded-full"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                    width: `${particle.size}px`,
                                    height: `${particle.size}px`,
                                    background: `radial-gradient(circle, 
                                        ${particle.color === 'violet' ? '#A470E3' : 
                                          particle.color === 'purple' ? '#8B45C4' : 
                                          particle.color === 'cyan' ? '#06B6D4' : '#10B981'} 80%, transparent 100%)`,
                                    animationDelay: `${particle.delay}ms`,
                                    filter: 'blur(0.5px)'
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Multi-layer Ambient Glow */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                    isHighlighted 
                        ? 'glow-pulse' 
                        : isHovered 
                            ? 'bg-gradient-to-r from-violet-400/15 via-purple-500/20 to-indigo-500/15 scale-105 blur-lg' 
                            : 'bg-gradient-to-r from-violet-400/8 via-purple-500/12 to-indigo-500/8 blur-lg'
                }`}
                style={{
                    background: isHighlighted 
                        ? 'radial-gradient(ellipse at center, rgba(164,112,227,0.3) 0%, rgba(6,182,212,0.2) 50%, rgba(139,69,196,0.25) 100%)'
                        : undefined,
                    filter: isHighlighted ? 'blur(15px)' : 'blur(10px)',
                    transform: isHighlighted ? 'scale(1.2)' : 'scale(1.05)'
                }}
                />

                {/* Pulse Ring Effects for Highlighted State */}
                {isHighlighted && (
                    <>
                        <div className="absolute inset-0 pulse-ring border border-violet-400/40 rounded-2xl" />
                        <div 
                            className="absolute inset-0 pulse-ring border border-cyan-400/30 rounded-2xl" 
                            style={{ animationDelay: '1s' }}
                        />
                    </>
                )}
                
                {/* Logo Container with Enhanced 2.5D Effects */}
                <div 
                    className={`relative z-20 transition-all duration-700 ${
                        isHighlighted ? 'scale-115 gentle-float' : isHovered ? 'scale-108' : 'scale-100'
                    }`}
                    style={{
                        transform: 'translateZ(15px)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Enhanced Logo Glow with Multiple Layers */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-700 ${
                        isHighlighted 
                            ? 'bg-gradient-to-br from-cyan-400/50 via-violet-500/60 to-purple-600/50 scale-120 blur-md' 
                            : isHovered
                                ? 'bg-gradient-to-br from-violet-400/35 via-purple-500/40 to-indigo-500/35 scale-110 blur-md'
                                : 'bg-gradient-to-br from-violet-400/20 via-purple-500/25 to-indigo-500/20 blur-md'
                    }`} />
                    
                    {/* Secondary Glow Ring */}
                    {isHighlighted && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-violet-200/40 to-cyan-200/30 scale-130 blur-lg opacity-60" />
                    )}
                    
                    {/* Logo Background with Enhanced Glassmorphism */}
                    <div 
                        className={`absolute inset-0 w-12 h-12 rounded-xl backdrop-blur-md border-2 transition-all duration-700 logo-glow ${
                            isHighlighted 
                                ? 'bg-gradient-to-br from-white/35 via-violet-100/30 to-purple-100/25 border-violet-300/60' 
                                : isHovered
                                    ? 'bg-gradient-to-br from-white/25 via-white/20 to-white/15 border-violet-300/40'
                                    : 'bg-gradient-to-br from-white/15 via-white/10 to-white/8 border-white/25'
                        }`}
                        style={{
                            boxShadow: isHighlighted 
                                ? `inset 0 2px 4px rgba(255,255,255,0.4), 
                                   0 0 20px rgba(164,112,227,0.6),
                                   0 8px 25px rgba(0,0,0,0.3)`
                                : `inset 0 1px 3px rgba(255,255,255,0.3), 
                                   0 0 12px rgba(164,112,227,0.3),
                                   0 4px 15px rgba(0,0,0,0.2)`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* 3D Depth Sides */}
                        <div 
                            className={`absolute top-0 right-0 w-1 h-full rounded-r-xl transition-colors duration-700 ${
                                isHighlighted ? 'bg-gradient-to-b from-violet-400/80 to-purple-600/90' : 'bg-gradient-to-b from-white/30 to-white/10'
                            }`}
                            style={{ 
                                transform: 'rotateY(90deg) translateZ(1px)',
                                transformOrigin: 'left center'
                            }}
                        />
                        <div 
                            className={`absolute bottom-0 left-0 w-full h-1 rounded-b-xl transition-colors duration-700 ${
                                isHighlighted ? 'bg-gradient-to-r from-violet-400/80 to-purple-600/90' : 'bg-gradient-to-r from-white/30 to-white/10'
                            }`}
                            style={{ 
                                transform: 'rotateX(-90deg) translateZ(1px)',
                                transformOrigin: 'top center'
                            }}
                        />
                    </div>
                    
                    {/* Shimmer Effect on Hover/Highlight */}
                    {(isHovered || isHighlighted) && (
                        <div className="absolute inset-0 w-12 h-12 rounded-xl overflow-hidden">
                            <div 
                                className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                style={{ width: '50%', height: '100%' }}
                            />
                        </div>
                    )}
                    
                    {/* Logo Image with Enhanced Effects */}
                    <Image
                        src={logo}
                        alt={`${text} experience icon`} 
                        height={12}
                        width={12}
                        className={`relative z-10 object-contain p-2 transition-all duration-700 ${
                            isHighlighted ? 'brightness-125 saturate-125' : isHovered ? 'brightness-110 saturate-110' : ''
                        }`}
                        style={{
                            filter: isHighlighted 
                                ? 'brightness(1.25) saturate(1.25) drop-shadow(0 4px 12px rgba(164,112,227,0.6))' 
                                : isHovered
                                    ? 'brightness(1.1) saturate(1.1) drop-shadow(0 3px 8px rgba(164,112,227,0.4))'
                                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                    />
                    
                    {/* Text Overlay on Logo */}
                    <div 
                        className={`absolute inset-0 flex items-center justify-center z-30 transition-all duration-700 ${
                            isHighlighted 
                                ? 'text-white font-bold text-xs scale-105' 
                                : isHovered 
                                    ? 'text-white font-semibold text-xs scale-102'
                                    : 'text-white/95 text-xs font-semibold'
                        }`}
                        style={{
                            textShadow: isHighlighted 
                                ? '0 2px 4px rgba(0,0,0,1), 0 0 10px rgba(164,112,227,0.8), 0 0 20px rgba(164,112,227,0.4)'
                                : '0 1px 3px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.8)',
                            pointerEvents: 'none'
                        }}
                    >
                        {text}
                    </div>
                </div>
                
                {/* Experience Amount Container with Premium 2.5D Effect */}
                <div 
                    className={`relative ml-5 flex justify-center items-center h-4/5 rounded-xl transition-all duration-700 overflow-hidden ${
                        isHighlighted ? 'w-48' : isHovered ? 'w-46' : 'w-44'
                    }`}
                    style={{
                        transform: isHighlighted 
                            ? 'rotateX(3deg) rotateY(-2deg) translateZ(8px)' 
                            : 'rotateX(2deg) rotateY(-1deg) translateZ(5px)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Background Container with Enhanced Depth */}
                    <div 
                        className={`absolute inset-0 rounded-xl border-2 transition-all duration-700 ${
                            isHighlighted 
                                ? 'bg-gradient-to-br from-black/60 via-violet-900/40 to-purple-900/50 border-violet-500/60' 
                                : isHovered
                                    ? 'bg-gradient-to-br from-black/50 via-black/55 to-black/60 border-violet-400/40'
                                    : 'bg-gradient-to-br from-black/40 via-black/45 to-black/50 border-black/60'
                        }`}
                        style={{
                            boxShadow: isHighlighted 
                                ? `inset 0 3px 12px rgba(164,112,227,0.3), 
                                   0 8px 25px rgba(164,112,227,0.4),
                                   0 0 30px rgba(164,112,227,0.2)` 
                                : isHovered
                                    ? `inset 0 2px 6px rgba(0,0,0,0.4), 
                                       0 4px 15px rgba(164,112,227,0.2)`
                                    : `inset 0 2px 4px rgba(0,0,0,0.3), 
                                       0 2px 8px rgba(0,0,0,0.2)`
                        }}
                    />
                    
                    {/* Animated Green Filling Bar */}
                    <div 
                        className={`absolute left-0 top-0 h-full rounded-xl transition-all duration-1000 ease-out ${
                            isHighlighted ? 'fill-animation' : 'w-0 opacity-0'
                        }`}
                        style={{
                            background: 'linear-gradient(90deg, #10B981 0%, #059669 25%, #34D399 50%, #6EE7B7 75%, #10B981 100%)',
                            boxShadow: `
                                inset 0 2px 4px rgba(255,255,255,0.4), 
                                inset 0 -1px 2px rgba(0,0,0,0.2),
                                0 0 15px rgba(16,185,129,0.6),
                                0 0 30px rgba(16,185,129,0.3)
                            `,
                            width: isHighlighted ? `${fillProgress}%` : '0%',
                            transitionDelay: isHighlighted ? '0.3s' : '0s'
                        }}
                    />
                    
                    {/* Top Glassmorphism Highlight */}
                    <div 
                        className={`absolute top-1 left-2 right-2 h-2 rounded-lg transition-all duration-700 z-10 ${
                            isHighlighted 
                                ? 'bg-gradient-to-r from-white/40 via-violet-200/35 to-purple-200/30' 
                                : isHovered 
                                    ? 'bg-gradient-to-r from-white/30 via-white/25 to-white/20'
                                    : 'bg-gradient-to-r from-white/20 via-white/15 to-white/10'
                        }`}
                        style={{
                            backdropFilter: 'blur(2px)'
                        }}
                    />
                    
                    {/* Enhanced 3D Side Depth Effects */}
                    <div 
                        className={`absolute right-[-2px] top-0 bottom-0 w-2 rounded-r-xl transition-all duration-700 ${
                            isHighlighted 
                                ? 'bg-gradient-to-b from-violet-600/70 to-purple-800/90' 
                                : 'bg-gradient-to-b from-black/70 to-black/90'
                        }`}
                        style={{ 
                            transform: 'rotateY(90deg) translateZ(1px)',
                            transformOrigin: 'left center'
                        }}
                    />
                    
                    <div 
                        className={`absolute bottom-[-2px] left-0 right-0 h-2 rounded-b-xl transition-all duration-700 ${
                            isHighlighted 
                                ? 'bg-gradient-to-r from-violet-600/70 to-purple-800/90' 
                                : 'bg-gradient-to-r from-black/70 to-black/90'
                        }`}
                        style={{ 
                            transform: 'rotateX(-90deg) translateZ(1px)',
                            transformOrigin: 'top center'
                        }}
                    />
                    
                    {/* Amount Text with Premium Styling */}
                    <div 
                        className={`relative z-20 font-bold transition-all duration-700 ${
                            isHighlighted 
                                ? 'text-white text-xl scale-105' 
                                : isHovered 
                                    ? 'text-white text-lg scale-102'
                                    : 'text-white/85 text-base'
                        }`}
                        style={{
                            textShadow: isHighlighted 
                                ? `0 3px 12px rgba(164,112,227,0.8), 
                                   0 0 20px rgba(164,112,227,0.6),
                                   0 1px 3px rgba(0,0,0,1)` 
                                : isHovered
                                    ? '0 2px 6px rgba(164,112,227,0.4), 0 1px 3px rgba(0,0,0,0.9)'
                                    : '0 1px 3px rgba(0,0,0,0.8)'
                        }}
                    >
                        {amount}
                    </div>
                </div>
                
                {/* Enhanced Ground Shadow */}
                <div 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                        isHighlighted ? 'scale-120 opacity-70' : isHovered ? 'scale-110 opacity-50' : 'scale-100 opacity-30'
                    }`}
                    style={{
                        width: '280px',
                        height: '25px',
                        background: isHighlighted 
                            ? 'radial-gradient(ellipse, rgba(164,112,227,0.4) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)'
                            : 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
                        filter: 'blur(12px)',
                        zIndex: -2,
                        transform: `translateX(-50%) ${isHighlighted ? 'scale(1.2)' : isHovered ? 'scale(1.1)' : 'scale(1)'}`
                    }}
                />
            </div>
        </>
    );
}