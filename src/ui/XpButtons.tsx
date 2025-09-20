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
    color: string;
}

export default function XpButton({ text, amount, logo, isHighlighted = false }: XpButtonProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    // Generate static particles for highlighted state
    useEffect(() => {
        if (isHighlighted) {
            const newParticles = Array.from({ length: 12 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                color: ['violet', 'purple', 'cyan', 'emerald'][Math.floor(Math.random() * 4)]
            }));
            setParticles(newParticles);
        }
    }, [isHighlighted]);

    return (
        <div 
            className={`relative group flex gap-5 items-center w-72 h-16 transition-all duration-300 [perspective:1000px] [transform-style:preserve-3d] ${
                isHighlighted ? 'scale-110' : 'hover:scale-105'
            }`}
        >
            {/* Static Floating Particles for Highlighted State */}
            {isHighlighted && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute rounded-full opacity-60 [filter:blur(0.5px)]"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                background: `radial-gradient(circle, 
                                    ${particle.color === 'violet' ? '#A470E3' : 
                                      particle.color === 'purple' ? '#8B45C4' : 
                                      particle.color === 'cyan' ? '#06B6D4' : '#10B981'} 80%, transparent 100%)`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Multi-layer Ambient Glow */}
            <div 
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isHighlighted 
                        ? 'bg-gradient-radial from-violet-400/30 via-purple-500/20 to-indigo-500/25 scale-120 blur-xl'
                        : 'bg-gradient-to-r from-violet-400/15 via-purple-500/20 to-indigo-500/15 scale-105 blur-lg group-hover:scale-110 group-hover:from-violet-400/20 group-hover:via-purple-500/25 group-hover:to-indigo-500/20'
                }`}
            />

            {/* Static Pulse Rings for Highlighted State */}
            {isHighlighted && (
                <>
                    <div className="absolute inset-0 border-2 border-violet-400/30 rounded-2xl scale-110" />
                    <div className="absolute inset-0 border border-cyan-400/20 rounded-2xl scale-125" />
                </>
            )}
            
            {/* Logo Container with Enhanced 3D Effects */}
            <div 
                className={`relative z-20 transition-all duration-300 [transform:translateZ(15px)_rotateX(2deg)_rotateY(-1deg)] [transform-style:preserve-3d] ${
                    isHighlighted ? 'scale-115' : 'group-hover:scale-108'
                }`}
            >
                {/* Enhanced Logo Glow with Multiple Layers */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    isHighlighted 
                        ? 'bg-gradient-to-br from-cyan-400/50 via-violet-500/60 to-purple-600/50 scale-120 blur-md' 
                        : 'bg-gradient-to-br from-violet-400/25 via-purple-500/30 to-indigo-500/25 blur-md group-hover:from-violet-400/35 group-hover:via-purple-500/40 group-hover:to-indigo-500/35 group-hover:scale-110'
                }`} />
                
                {/* Secondary Glow Ring */}
                {isHighlighted && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-violet-200/40 to-cyan-200/30 scale-130 blur-lg opacity-60" />
                )}
                
                {/* Logo Background with Enhanced Glassmorphism */}
                <div 
                    className={`absolute inset-0 w-12 h-12 rounded-xl backdrop-blur-md border-2 transition-all duration-300 [transform-style:preserve-3d] ${
                        isHighlighted 
                            ? 'bg-gradient-to-br from-white/35 via-violet-100/30 to-purple-100/25 border-violet-300/60 [box-shadow:inset_0_2px_4px_rgba(255,255,255,0.4),_0_0_20px_rgba(164,112,227,0.6),_0_8px_25px_rgba(0,0,0,0.3)]' 
                            : 'bg-gradient-to-br from-white/15 via-white/10 to-white/8 border-white/25 group-hover:bg-gradient-to-br group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/15 group-hover:border-violet-300/40 [box-shadow:inset_0_1px_3px_rgba(255,255,255,0.3),_0_0_12px_rgba(164,112,227,0.3),_0_4px_15px_rgba(0,0,0,0.2)]'
                    }`}
                >
                    {/* 3D Depth Sides */}
                    <div 
                        className={`absolute top-0 right-0 w-1 h-full rounded-r-xl transition-colors duration-300 [transform:rotateY(90deg)_translateZ(1px)] [transform-origin:left_center] ${
                            isHighlighted ? 'bg-gradient-to-b from-violet-400/80 to-purple-600/90' : 'bg-gradient-to-b from-white/30 to-white/10'
                        }`}
                    />
                    <div 
                        className={`absolute bottom-0 left-0 w-full h-1 rounded-b-xl transition-colors duration-300 [transform:rotateX(-90deg)_translateZ(1px)] [transform-origin:top_center] ${
                            isHighlighted ? 'bg-gradient-to-r from-violet-400/80 to-purple-600/90' : 'bg-gradient-to-r from-white/30 to-white/10'
                        }`}
                    />
                </div>
                
                {/* Static Shimmer Effect */}
                <div className="absolute inset-0 w-12 h-12 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 translate-x-8 w-1/2 h-full"
                    />
                </div>
                
                {/* Logo Image with Enhanced Effects */}
                <Image
                    src={logo}
                    alt={`${text} experience icon`} 
                    height={12}
                    width={12}
                    className={`relative z-10 object-contain p-2 transition-all duration-300 ${
                        isHighlighted 
                            ? 'brightness-125 saturate-125 [filter:brightness(1.25)_saturate(1.25)_drop-shadow(0_4px_12px_rgba(164,112,227,0.6))]' 
                            : 'group-hover:brightness-110 group-hover:saturate-110 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))]'
                    }`}
                />
                
                {/* Text Overlay on Logo */}
                <div 
                    className={`absolute inset-0 flex items-center justify-center z-30 transition-all duration-300 pointer-events-none ${
                        isHighlighted 
                            ? 'text-white font-bold text-xs scale-105 [text-shadow:0_2px_4px_rgba(0,0,0,1),_0_0_10px_rgba(164,112,227,0.8),_0_0_20px_rgba(164,112,227,0.4)]' 
                            : 'text-white/95 text-xs font-semibold group-hover:text-white group-hover:font-semibold group-hover:scale-102 [text-shadow:0_1px_3px_rgba(0,0,0,1),_0_0_6px_rgba(0,0,0,0.8)]'
                    }`}
                >
                    {text}
                </div>
            </div>
            
            {/* Experience Amount Container with Premium 3D Effect */}
            <div 
                className={`relative ml-5 flex justify-center items-center h-4/5 rounded-xl transition-all duration-300 overflow-hidden [transform-style:preserve-3d] ${
                    isHighlighted 
                        ? 'w-48 [transform:rotateX(3deg)_rotateY(-2deg)_translateZ(8px)]' 
                        : 'w-44 group-hover:w-46 [transform:rotateX(2deg)_rotateY(-1deg)_translateZ(5px)]'
                }`}
            >
                {/* Background Container with Enhanced Depth */}
                <div 
                    className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
                        isHighlighted 
                            ? 'bg-gradient-to-br from-black/60 via-violet-900/40 to-purple-900/50 border-violet-500/60 [box-shadow:inset_0_3px_12px_rgba(164,112,227,0.3),_0_8px_25px_rgba(164,112,227,0.4),_0_0_30px_rgba(164,112,227,0.2)]' 
                            : 'bg-gradient-to-br from-black/40 via-black/45 to-black/50 border-black/60 group-hover:bg-gradient-to-br group-hover:from-black/50 group-hover:via-black/55 group-hover:to-black/60 group-hover:border-violet-400/40 [box-shadow:inset_0_2px_4px_rgba(0,0,0,0.3),_0_2px_8px_rgba(0,0,0,0.2)]'
                    }`}
                />
                
                {/* Static Green Filling Bar - Full when highlighted */}
                {isHighlighted && (
                    <div 
                        className="absolute left-0 top-0 h-full w-full rounded-xl opacity-85 [background:linear-gradient(90deg,#10B981_0%,#059669_25%,#34D399_50%,#6EE7B7_75%,#10B981_100%)] [box-shadow:inset_0_2px_4px_rgba(255,255,255,0.4),_inset_0_-1px_2px_rgba(0,0,0,0.2),_0_0_15px_rgba(16,185,129,0.6),_0_0_30px_rgba(16,185,129,0.3)]"
                    />
                )}
                
                {/* Top Glassmorphism Highlight */}
                <div 
                    className={`absolute top-1 left-2 right-2 h-2 rounded-lg transition-all duration-300 z-10 [backdrop-filter:blur(2px)] ${
                        isHighlighted 
                            ? 'bg-gradient-to-r from-white/40 via-violet-200/35 to-purple-200/30' 
                            : 'bg-gradient-to-r from-white/20 via-white/15 to-white/10 group-hover:bg-gradient-to-r group-hover:from-white/30 group-hover:via-white/25 group-hover:to-white/20'
                    }`}
                />
                
                {/* Enhanced 3D Side Depth Effects */}
                <div 
                    className={`absolute right-[-2px] top-0 bottom-0 w-2 rounded-r-xl transition-all duration-300 [transform:rotateY(90deg)_translateZ(1px)] [transform-origin:left_center] ${
                        isHighlighted 
                            ? 'bg-gradient-to-b from-violet-600/70 to-purple-800/90' 
                            : 'bg-gradient-to-b from-black/70 to-black/90'
                    }`}
                />
                
                <div 
                    className={`absolute bottom-[-2px] left-0 right-0 h-2 rounded-b-xl transition-all duration-300 [transform:rotateX(-90deg)_translateZ(1px)] [transform-origin:top_center] ${
                        isHighlighted 
                            ? 'bg-gradient-to-r from-violet-600/70 to-purple-800/90' 
                            : 'bg-gradient-to-r from-black/70 to-black/90'
                    }`}
                />
                
                {/* Amount Text with Premium Styling */}
                <div 
                    className={`relative z-20 font-bold transition-all duration-300 ${
                        isHighlighted 
                            ? 'text-white text-xl scale-105 [text-shadow:0_3px_12px_rgba(164,112,227,0.8),_0_0_20px_rgba(164,112,227,0.6),_0_1px_3px_rgba(0,0,0,1)]' 
                            : 'text-white/85 text-base group-hover:text-white group-hover:text-lg group-hover:scale-102 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]'
                    }`}
                >
                    {amount}
                </div>
            </div>
            
            {/* Enhanced Ground Shadow */}
            <div 
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 [filter:blur(12px)] [-z-2] ${
                    isHighlighted 
                        ? 'scale-120 opacity-70 w-[280px] h-[25px] [background:radial-gradient(ellipse,rgba(164,112,227,0.4)_0%,rgba(0,0,0,0.3)_40%,transparent_70%)]' 
                        : 'scale-100 opacity-30 group-hover:scale-110 group-hover:opacity-50 w-[280px] h-[25px] [background:radial-gradient(ellipse,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.2)_40%,transparent_70%)]'
                }`}
            />
        </div>
    );
}
