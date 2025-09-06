"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
}
export default function Navbar() {
    const sections = useMemo(() => [
        { id: 'home', Icon: 'HomeIcon', Logo: '/navLogos/home.png' },
        { id: 'projects', Icon: 'ProjectsIcon', Logo: '/navLogos/projects.png' },
        { id: 'blog', Icon: 'BlogIcon', Logo: '/navLogos/blogs.png' },
        { id: 'about', Icon: 'AboutIcon', Logo: '/navLogos/about.png' },
        { id: 'contact', Icon: 'ContactIcon', Logo: '/navLogos/contact.png' },
    ], []);
    
    const [activeSection, setActiveSection] = useState('home');
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState< Particle[] >([]);

    // Generate floating particles for navbar
    useEffect(() => {
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 2000
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections]);

    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            {/* Enhanced Keyframe Animations */}
            <style jsx>{`
                @keyframes gentle-float {
                    0%, 100% { 
                        transform: translateY(-50%) rotateX(3deg) rotateY(-2deg) translateZ(0px); 
                    }
                    50% { 
                        transform: translateY(-55%) rotateX(4deg) rotateY(-3deg) translateZ(10px); 
                    }
                }
                
                @keyframes particle-orbit {
                    0% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.8); 
                        opacity: 0.3;
                    }
                    50% { 
                        transform: translateY(-20px) translateX(10px) rotate(180deg) scale(1.2); 
                        opacity: 0.8;
                    }
                    100% { 
                        transform: translateY(-40px) translateX(20px) rotate(360deg) scale(0.6); 
                        opacity: 0;
                    }
                }
                
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 1; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                
                @keyframes active-glow {
                    0%, 100% { 
                        filter: drop-shadow(0 0 15px rgba(164,112,227,0.6)) drop-shadow(0 0 30px rgba(164,112,227,0.3));
                    }
                    50% { 
                        filter: drop-shadow(0 0 25px rgba(164,112,227,0.8)) drop-shadow(0 0 50px rgba(164,112,227,0.5));
                    }
                }
                
                @keyframes icon-float {
                    0%, 100% { 
                        transform: translateY(0px) translateZ(15px) rotateZ(0deg); 
                    }
                    50% { 
                        transform: translateY(-8px) translateZ(20px) rotateZ(5deg); 
                    }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(200%) rotate(45deg); }
                }
                
                .gentle-float {
                    animation: gentle-float 6s ease-in-out infinite;
                }
                
                .particle-orbit {
                    animation: particle-orbit 4s ease-out infinite;
                }
                
                .pulse-ring {
                    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .active-glow {
                    animation: active-glow 2.5s ease-in-out infinite;
                }
                
                .icon-float {
                    animation: icon-float 4s ease-in-out infinite;
                }
                
                .shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
            `}</style>

            <div 
                className="fixed z-[100] right-0 top-2/3 -translate-y-1/2 gentle-float"
                style={{
                    perspective: '1000px'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Floating Particles Background */}
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
                                background: `radial-gradient(circle, rgba(164,112,227,0.6) 0%, rgba(139,69,196,0.3) 100%)`,
                                animationDelay: `${particle.delay}ms`,
                                filter: 'blur(0.5px)'
                            }}
                        />
                    ))}
                </div>

                {/* Multi-layer Ambient Glow */}
                <div 
                    className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                        isHovered ? 'scale-120' : 'scale-110'
                    }`}
                    style={{
                        background: `radial-gradient(ellipse at center, 
                            rgba(164,112,227,0.25) 0%, 
                            rgba(139,69,196,0.15) 50%, 
                            transparent 80%)`,
                        filter: 'blur(20px)'
                    }}
                />

                {/* Pulse Ring Effect */}
                {isHovered && (
                    <div className="absolute inset-0 pulse-ring border border-violet-400/40 rounded-3xl" />
                )}
                
                {/* Main navbar container with enhanced glassmorphism */}
                <div 
                    className={`relative flex flex-col justify-center items-center gap-6 p-8 rounded-3xl transition-all duration-700 ${
                        isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                        background: `linear-gradient(135deg, 
                            rgba(0,0,0,0.6) 0%, 
                            rgba(164,112,227,0.15) 50%, 
                            rgba(0,0,0,0.7) 100%)`,
                        backdropFilter: 'blur(25px)',
                        border: '1px solid rgba(164,112,227,0.3)',
                        boxShadow: isHovered 
                            ? `0 25px 50px rgba(164,112,227,0.4), 
                               inset 0 1px 0 rgba(255,255,255,0.2), 
                               0 0 40px rgba(164,112,227,0.3)` 
                            : `0 15px 35px rgba(0,0,0,0.3), 
                               inset 0 1px 0 rgba(255,255,255,0.1),
                               0 0 20px rgba(164,112,227,0.2)`,
                        transform: 'rotateX(3deg) rotateY(-2deg)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Enhanced Top Highlight */}
                    <div 
                        className="absolute top-3 left-6 right-6 h-1 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(164,112,227,0.6), rgba(255,255,255,0.4), rgba(164,112,227,0.6), transparent)'
                        }}
                    />
                    
                    {/* 3D Side Depth Effects */}
                    <div 
                        className="absolute right-[-3px] top-0 bottom-0 w-3 rounded-r-3xl"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(164,112,227,0.4), rgba(139,69,196,0.6))',
                            transform: 'rotateY(90deg) translateZ(2px)',
                            transformOrigin: 'left center'
                        }}
                    />
                    <div 
                        className="absolute bottom-[-3px] left-0 right-0 h-3 rounded-b-3xl"
                        style={{
                            background: 'linear-gradient(to right, rgba(164,112,227,0.4), rgba(139,69,196,0.6))',
                            transform: 'rotateX(-90deg) translateZ(2px)',
                            transformOrigin: 'top center'
                        }}
                    />

                    {/* Shimmer Effect on Hover */}
                    {isHovered && (
                        <div className="absolute inset-0 rounded-3xl overflow-hidden">
                            <div 
                                className="shimmer absolute inset-0 w-full h-full opacity-30"
                                style={{
                                    background: 'linear-gradient(45deg, transparent, rgba(164,112,227,0.6), transparent)',
                                    width: '50%'
                                }}
                            />
                        </div>
                    )}

                    {sections.map((section, index) => {
                        const isActive = activeSection === section.id;
                        return (
                            <div 
                                key={section.id}
                                className={`relative group cursor-pointer transition-all duration-700 ${
                                    isActive ? 'scale-125 icon-float' : isHovered ? 'scale-110' : 'scale-100'
                                }`}
                                onClick={() => handleNavClick(section.id)}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Enhanced Icon Glow - Multiple Layers */}
                                <div 
                                    className={`absolute inset-0 rounded-full transition-all duration-700 ${
                                        isActive ? 'active-glow scale-150' : 'scale-120'
                                    }`}
                                    style={{
                                        background: isActive 
                                            ? `radial-gradient(circle, 
                                                rgba(164,112,227,0.6) 0%, 
                                                rgba(139,69,196,0.4) 30%, 
                                                rgba(164,112,227,0.2) 60%, 
                                                transparent 80%)`
                                            : `radial-gradient(circle, 
                                                rgba(164,112,227,0.3) 0%, 
                                                rgba(139,69,196,0.2) 50%, 
                                                transparent 70%)`,
                                        filter: 'blur(15px)'
                                    }}
                                />

                                {/* Secondary Glow Ring */}
                                {isActive && (
                                    <div 
                                        className="absolute inset-0 rounded-full scale-140"
                                        style={{
                                            background: 'radial-gradient(circle, transparent 40%, rgba(164,112,227,0.4) 50%, transparent 70%)',
                                            filter: 'blur(10px)'
                                        }}
                                    />
                                )}

                                {/* Pulse Ring for Active State */}
                                {isActive && (
                                    <div className="absolute inset-0 pulse-ring border-2 border-violet-400/60 rounded-full" />
                                )}
                                
                                {/* Large Icon with Premium Effects */}
                                <div 
                                    className={`relative flex items-center justify-center w-16 h-16 transition-all duration-700 ${
                                        isActive ? 'scale-110' : 'hover:scale-105'
                                    }`}
                                    style={{
                                        transform: 'translateZ(20px)',
                                        filter: isActive 
                                            ? 'drop-shadow(0 0 20px rgba(164,112,227,0.8)) drop-shadow(0 8px 25px rgba(0,0,0,0.3))'
                                            : 'drop-shadow(0 0 10px rgba(164,112,227,0.4)) drop-shadow(0 4px 15px rgba(0,0,0,0.2))'
                                    }}
                                >
                                    {/* Icon Background Glow */}
                                    <div 
                                        className={`absolute inset-0 rounded-full transition-all duration-500 ${
                                            isActive 
                                                ? 'bg-gradient-to-br from-white/20 via-violet-200/30 to-purple-200/20' 
                                                : 'bg-gradient-to-br from-white/10 via-white/15 to-white/5 group-hover:from-white/15'
                                        }`}
                                        style={{
                                            backdropFilter: 'blur(2px)',
                                            boxShadow: isActive 
                                                ? 'inset 0 2px 4px rgba(255,255,255,0.3)' 
                                                : 'inset 0 1px 2px rgba(255,255,255,0.2)'
                                        }}
                                    />
                                    
                                    {/* Enhanced Icon */}
                                    <Image
                                        src={section.Icon}
                                        alt={`${section.id} navigation icon`} 
                                        height={10}
                                        width={10}
                                        className={`relative z-10 object-contain transition-all duration-700 ${
                                            isActive 
                                                ? 'brightness-125 saturate-125' 
                                                : 'brightness-110 saturate-110 group-hover:brightness-120 group-hover:saturate-120'
                                        }`}
                                        style={{
                                            filter: isActive 
                                                ? 'brightness(1.25) saturate(1.25) drop-shadow(0 4px 12px rgba(164,112,227,0.7))' 
                                                : 'brightness(1.1) saturate(1.1) drop-shadow(0 2px 6px rgba(164,112,227,0.4))'
                                        }}
                                    />

                                    {/* Active State Micro Particles */}
                                    {isActive && (
                                        <>
                                            <div 
                                                className="absolute -top-2 -right-2 w-2 h-2 bg-violet-400/80 rounded-full animate-ping"
                                                style={{ animationDuration: '1.5s' }}
                                            />
                                            <div 
                                                className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400/80 rounded-full animate-ping" 
                                                style={{ animationDelay: '0.7s', animationDuration: '1.5s' }}
                                            />
                                            <div 
                                                className="absolute -top-2 -left-1 w-1 h-1 bg-cyan-400/80 rounded-full animate-ping" 
                                                style={{ animationDelay: '1.2s', animationDuration: '1.5s' }}
                                            />
                                        </>
                                    )}
                                </div>
                                
                                {/* Enhanced Tooltip with 2.5D Effect */}
                                <div 
                                    className={`absolute left-[-140px] top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none ${
                                        isActive || isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                                    }`}
                                >
                                    <div 
                                        className="relative px-5 py-3 rounded-xl backdrop-blur-md border whitespace-nowrap"
                                        style={{
                                            background: `linear-gradient(135deg, 
                                                rgba(0,0,0,0.8) 0%, 
                                                rgba(164,112,227,0.2) 50%, 
                                                rgba(0,0,0,0.9) 100%)`,
                                            borderColor: 'rgba(164,112,227,0.4)',
                                            boxShadow: `0 10px 25px rgba(0,0,0,0.4), 
                                                       inset 0 1px 0 rgba(255,255,255,0.2),
                                                       0 0 15px rgba(164,112,227,0.3)`,
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                                        }}
                                    >
                                        {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                                        
                                        {/* 3D Arrow */}
                                        <div 
                                            className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0"
                                            style={{
                                                borderTop: '6px solid transparent',
                                                borderBottom: '6px solid transparent',
                                                borderLeft: '8px solid rgba(0,0,0,0.8)',
                                                filter: 'drop-shadow(2px 0 3px rgba(164,112,227,0.3))'
                                            }}
                                        />

                                        {/* Top Highlight */}
                                        <div 
                                            className="absolute top-1 left-2 right-2 h-0.5 rounded-full"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(164,112,227,0.6), transparent)'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                    {/* Enhanced Bottom Accent */}
                    <div 
                        className={`absolute bottom-3 left-8 right-8 h-1 rounded-full transition-all duration-700`}
                        style={{
                            background: isHovered 
                                ? 'linear-gradient(90deg, transparent, rgba(164,112,227,0.8), rgba(255,255,255,0.6), rgba(164,112,227,0.8), transparent)'
                                : 'linear-gradient(90deg, transparent, rgba(164,112,227,0.4), rgba(255,255,255,0.3), rgba(164,112,227,0.4), transparent)'
                        }}
                    />
                </div>

                {/* Enhanced Ground Shadow */}
                <div 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                        isHovered ? 'scale-120 opacity-60' : 'scale-100 opacity-40'
                    }`}
                    style={{
                        width: '120px',
                        height: '30px',
                        background: 'radial-gradient(ellipse, rgba(164,112,227,0.4) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
                        filter: 'blur(15px)',
                        zIndex: -2
                    }}
                />
            </div>
        </>
    );
}