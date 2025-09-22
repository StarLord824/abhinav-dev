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
            {/* Particles */}
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

            {/* Ambient Glow */}
            <div 
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isHighlighted 
                        ? 'bg-gradient-radial from-violet-400/30 via-purple-500/20 to-indigo-500/25 scale-120 blur-xl'
                        : 'bg-gradient-to-r from-violet-400/15 via-purple-500/20 to-indigo-500/15 scale-105 blur-lg group-hover:scale-110 group-hover:from-violet-400/20 group-hover:via-purple-500/25 group-hover:to-indigo-500/20'
                }`}
            />

            {/* Logo Container */}
            <div 
                className={`relative z-20 flex items-center justify-center w-12 h-12 transition-all duration-300 [transform:translateZ(15px)_rotateX(2deg)_rotateY(-1deg)] [transform-style:preserve-3d] ${
                    isHighlighted ? 'scale-115' : 'group-hover:scale-108'
                }`}
            >
                {/* Background */}
                <div 
                    className={`absolute w-12 h-12 rounded-xl backdrop-blur-md border-2 transition-all duration-300 [transform-style:preserve-3d] ${
                        isHighlighted 
                            ? 'bg-gradient-to-br from-white/35 via-violet-100/30 to-purple-100/25 border-violet-300/60 [box-shadow:inset_0_2px_4px_rgba(255,255,255,0.4),_0_0_20px_rgba(164,112,227,0.6),_0_8px_25px_rgba(0,0,0,0.3)]' 
                            : 'bg-gradient-to-br from-white/15 via-white/10 to-white/8 border-white/25 group-hover:bg-gradient-to-br group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/15 group-hover:border-violet-300/40 [box-shadow:inset_0_1px_3px_rgba(255,255,255,0.3),_0_0_12px_rgba(164,112,227,0.3),_0_4px_15px_rgba(0,0,0,0.2)]'
                    }`}
                />

                {/* Logo */}
                <Image
                    src={logo}
                    alt={`${text} experience icon`} 
                    width={48}
                    height={48}
                    className={`relative z-10 object-contain p-2 transition-all duration-300 ${
                        isHighlighted 
                            ? 'brightness-125 saturate-125 [filter:brightness(1.25)_saturate(1.25)_drop-shadow(0_4px_12px_rgba(164,112,227,0.6))]' 
                            : 'group-hover:brightness-110 group-hover:saturate-110 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))]'
                    }`}
                />

                {/* Text Overlay */}
                <div 
                    className={`absolute inset-0 flex items-center justify-center z-30 pointer-events-none transition-all duration-300 ${
                        isHighlighted 
                            ? 'text-white font-bold text-xs scale-105 [text-shadow:0_2px_4px_rgba(0,0,0,1),_0_0_10px_rgba(164,112,227,0.8),_0_0_20px_rgba(164,112,227,0.4)]' 
                            : 'text-white/95 text-xs font-semibold group-hover:text-white group-hover:font-semibold group-hover:scale-102 [text-shadow:0_1px_3px_rgba(0,0,0,1),_0_0_6px_rgba(0,0,0,0.8)]'
                    }`}
                >
                    {text}
                </div>
            </div>

            {/* Amount Container */}
            <div 
                className={`relative ml-5 flex justify-center items-center h-4/5 rounded-xl transition-all duration-300 overflow-hidden [transform-style:preserve-3d] ${
                    isHighlighted 
                        ? 'w-48 [transform:rotateX(3deg)_rotateY(-2deg)_translateZ(8px)]' 
                        : 'w-44 group-hover:w-46 [transform:rotateX(2deg)_rotateY(-1deg)_translateZ(5px)]'
                }`}
            >
                <div 
                    className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
                        isHighlighted 
                            ? 'bg-gradient-to-br from-black/60 via-violet-900/40 to-purple-900/50 border-violet-500/60 [box-shadow:inset_0_3px_12px_rgba(164,112,227,0.3),_0_8px_25px_rgba(164,112,227,0.4),_0_0_30px_rgba(164,112,227,0.2)]' 
                            : 'bg-gradient-to-br from-black/40 via-black/45 to-black/50 border-black/60 group-hover:bg-gradient-to-br group-hover:from-black/50 group-hover:via-black/55 group-hover:to-black/60 group-hover:border-violet-400/40 [box-shadow:inset_0_2px_4px_rgba(0,0,0,0.3),_0_2px_8px_rgba(0,0,0,0.2)]'
                    }`}
                />

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
        </div>
    );
}
