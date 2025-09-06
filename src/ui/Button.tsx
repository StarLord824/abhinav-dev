'use client';

import { useState, useEffect } from 'react';

interface ButtonProps {
    content: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
}

export default function Button(props: ButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [particles, setParticles] = useState< Particle[] >([]);

    // Generate floating particles for active state
    useEffect(() => {
        if (isActive) {
            const newParticles = Array.from({ length: 8 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                delay: Math.random() * 1000
            }));
            setParticles(newParticles);
        }
    }, [isActive]);

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
                
                @keyframes particle-burst {
                    0% { 
                        transform: translateY(0px) translateX(0px) scale(0); 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(-30px) translateX(20px) scale(1); 
                        opacity: 0;
                    }
                }
                
                @keyframes pulse-ring {
                    0% { transform: scale(0.9); opacity: 1; }
                    100% { transform: scale(1.4); opacity: 0; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes glow-pulse {
                    0%, 100% { 
                        box-shadow: 0 0 20px rgba(164,112,227,0.4), 0 0 40px rgba(255,196,3,0.3), 0 15px 35px rgba(0,0,0,0.3);
                    }
                    50% { 
                        box-shadow: 0 0 30px rgba(164,112,227,0.6), 0 0 60px rgba(255,196,3,0.5), 0 20px 40px rgba(0,0,0,0.4);
                    }
                }
                
                .gentle-float {
                    animation: gentle-float 4s ease-in-out infinite;
                }
                
                .particle-burst {
                    animation: particle-burst 1s ease-out forwards;
                }
                
                .pulse-ring {
                    animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
                
                .glow-pulse {
                    animation: glow-pulse 2s ease-in-out infinite;
                }
                
                .heavy-stroke-text {
                    text-shadow: 
                        -2px -2px 0 #000,
                        2px -2px 0 #000,
                        -2px 2px 0 #000,
                        2px 2px 0 #000,
                        0 0 10px rgba(0,0,0,0.5);
                }
            `}</style>

            <div 
                className="relative"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsActive(false);
                }}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
            >
                {/* Floating Particles for Active State */}
                {isActive && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {particles.map((particle) => (
                            <div
                                key={particle.id}
                                className="absolute particle-burst rounded-full"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                    width: `${particle.size}px`,
                                    height: `${particle.size}px`,
                                    background: `radial-gradient(circle, #ffc403 0%, #A470E3 100%)`,
                                    animationDelay: `${particle.delay}ms`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Main Button Container with 3D Context */}
                <div 
                    className={`relative gentle-float transition-all duration-700 ease-out transform-gpu ${
                        isHovered ? 'scale-110' : 'scale-105'
                    } ${isActive ? 'scale-100' : ''}`}
                    style={{ 
                        transformStyle: 'preserve-3d',
                        width: isHovered ? '213px' : '203px',
                        height: '80px'
                    }}
                >
                    {/* Pulse Ring Effect on Hover */}
                    {isHovered && (
                        <div className="absolute inset-0 pulse-ring border-2 border-violet-400/60 rounded-[13px] z-0" />
                    )}

                    {/* Background Glow Effect */}
                    <div 
                        className={`absolute inset-0 rounded-[13px] transition-opacity duration-500 ${
                            isHovered ? 'opacity-100 glow-pulse' : 'opacity-0'
                        }`}
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(164,112,227,0.3) 0%, transparent 70%)',
                            filter: 'blur(10px)',
                            transform: 'scale(1.2)',
                            zIndex: -1
                        }}
                    />

                    <button className="relative w-full h-full group">
                        {/* Main Button Body with Enhanced 2.5D */}
                        <div 
                            className={`flex justify-center items-center relative w-full h-20 rounded-[13px] transition-all duration-500 transform-gpu ${
                                isActive ? 'translate-y-1' : 'translate-y-0'
                            }`}
                            style={{
                                background: `linear-gradient(135deg, 
                                    #ffc403 0%, 
                                    #ffed4e 25%, 
                                    #ffc403 50%, 
                                    #e6af02 75%, 
                                    #d39e02 100%)`,
                                borderBottom: isActive ? '2px solid #d36f0a' : '4px solid #d36f0a',
                                boxShadow: isActive 
                                    ? `inset 0px 2px 4px rgba(97,82,61,0.4), 
                                       0 4px 15px rgba(164,112,227,0.3)`
                                    : `inset 0px 4px 4px rgba(97,82,61,0.4), 
                                       0 8px 25px rgba(0,0,0,0.3),
                                       0 0 20px rgba(255,196,3,0.4)`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* 3D Side Faces */}
                            <div 
                                className="absolute top-0 right-0 w-2 h-full rounded-r-[13px]"
                                style={{
                                    background: 'linear-gradient(to bottom, #d39e02, #b8850a)',
                                    transform: 'rotateY(90deg) translateZ(1px)',
                                    transformOrigin: 'left center'
                                }}
                            />
                            <div 
                                className="absolute bottom-0 left-0 w-full h-2 rounded-b-[13px]"
                                style={{
                                    background: 'linear-gradient(to right, #d36f0a, #b85c0a)',
                                    transform: 'rotateX(-90deg) translateZ(1px)',
                                    transformOrigin: 'top center'
                                }}
                            />

                            {/* Top Highlight Strip */}
                            <div 
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-[13px]"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(164,112,227,0.3) 50%, rgba(255,255,255,0.6) 100%)'
                                }}
                            />

                            {/* Shimmer Effect on Hover */}
                            {isHovered && (
                                <div 
                                    className="absolute inset-0 rounded-[13px] overflow-hidden"
                                    style={{ zIndex: 1 }}
                                >
                                    <div 
                                        className="shimmer absolute inset-0 w-full h-full"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                            transform: 'skewX(-20deg)'
                                        }}
                                    />
                                </div>
                            )}

                            {/* Main Text with Enhanced Styling */}
                            <div 
                                className={`font-bold text-3xl text-black heavy-stroke-text relative z-10 transition-all duration-300 ${
                                    isHovered ? 'scale-105 text-shadow-glow' : ''
                                } ${isActive ? 'scale-95' : ''}`}
                                style={{
                                    textShadow: isHovered 
                                        ? `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 15px rgba(164,112,227,0.8), 0 0 5px rgba(0,0,0,0.5)`
                                        : `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 10px rgba(0,0,0,0.5)`
                                }}
                            >
                                {props.content} 
                            </div>

                            {/* Enhanced Highlight Dot with 2.5D Effect */}
                            <div 
                                className={`absolute top-1.5 right-2 transition-all duration-500 transform-gpu ${
                                    isHovered ? 'scale-125 rotate-12' : 'scale-100'
                                } ${isActive ? 'scale-90' : ''}`}
                                style={{
                                    width: '6px',
                                    height: '9px',
                                    background: `linear-gradient(135deg, 
                                        rgba(255,255,255,0.9) 0%, 
                                        rgba(164,112,227,0.6) 50%, 
                                        rgba(255,255,255,0.7) 100%)`,
                                    borderRadius: '6px / 8px',
                                    transform: `rotate(-35.23deg) ${isHovered ? 'scale(1.25) rotate(12deg)' : ''} ${isActive ? 'scale(0.9)' : ''}`,
                                    boxShadow: `
                                        0 0 8px rgba(255,255,255,0.8),
                                        inset 0 1px 2px rgba(164,112,227,0.3),
                                        0 2px 4px rgba(0,0,0,0.2)
                                    `,
                                    filter: isHovered ? 'drop-shadow(0 0 6px rgba(164,112,227,0.8))' : 'none',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Micro 3D depth for highlight */}
                                <div 
                                    className="absolute top-0 right-0 w-0.5 h-full rounded-r-full"
                                    style={{
                                        background: 'linear-gradient(to bottom, rgba(164,112,227,0.8), rgba(139,69,196,0.9))',
                                        transform: 'rotateY(90deg) translateZ(0.5px)',
                                        transformOrigin: 'left center'
                                    }}
                                />
                            </div>

                            {/* Glassmorphism Overlay */}
                            <div 
                                className={`absolute inset-0 rounded-[13px] transition-opacity duration-500 pointer-events-none ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(164,112,227,0.1) 100%)',
                                    backdropFilter: 'blur(1px)'
                                }}
                            />
                        </div>

                        {/* Interactive Feedback Ring */}
                        {isActive && (
                            <div 
                                className="absolute inset-0 rounded-[13px] border-2 border-violet-400/80"
                                style={{
                                    boxShadow: '0 0 20px rgba(164,112,227,0.6), inset 0 0 20px rgba(164,112,227,0.2)'
                                }}
                            />
                        )}
                    </button>
                </div>

                {/* Ambient Ground Shadow */}
                <div 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                        isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
                    }`}
                    style={{
                        width: '180px',
                        height: '20px',
                        background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
                        filter: 'blur(8px)',
                        zIndex: -2
                    }}
                />
            </div>
        </>
    );
}