"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

export default function Navbar() {
    const sections = useMemo(() => [
        { id: 'home', icon: '/navLogos/home.png', label: 'Home' },
        { id: 'projects', icon: '/navLogos/projects.png', label: 'Projects' },
        { id: 'blog', icon: '/navLogos/blogs.png', label: 'Blog' },
        { id: 'about', icon: '/navLogos/about.png', label: 'About' },
        { id: 'contact', icon: '/navLogos/contact.png', label: 'Contact' },
    ], []);
    
    const [activeSection, setActiveSection] = useState('home');
    const [isNavHovered, setIsNavHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
        <div 
            className="fixed z-[100] right-8 top-1/2 -translate-y-1/2 transform transition-all duration-500"
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
            style={{
                filter: isNavHovered 
                    ? 'drop-shadow(0 0 30px rgba(164,112,227,0.6))' 
                    : 'drop-shadow(0 0 15px rgba(164,112,227,0.3))'
            }}
        >
            {/* Ambient glow background */}
            <div 
                className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                    isNavHovered ? 'scale-125 opacity-60' : 'scale-110 opacity-30'
                }`}
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(164,112,227,0.4) 0%, rgba(139,69,196,0.2) 50%, transparent 80%)',
                    filter: 'blur(20px)'
                }}
            />

            {/* Main navigation container */}
            <div 
                className={`relative overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-500 ${
                    isNavHovered ? 'scale-105' : 'scale-100'
                }`}
                style={{
                    background: `linear-gradient(135deg, 
                        rgba(0,0,0,0.5) 0%, 
                        rgba(164,112,227,0.15) 30%,
                        rgba(139,69,196,0.2) 70%, 
                        rgba(0,0,0,0.6) 100%)`,
                    border: '1px solid rgba(164,112,227,0.4)',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 
                               inset 0 1px 0 rgba(255,255,255,0.2),
                               0 0 30px rgba(164,112,227,0.3)`
                }}
            >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                
                {/* Side glow effect */}
                <div className="absolute top-2 bottom-2 right-0 w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60" />

                {/* Navigation items */}
                <div className="flex flex-col p-6 gap-4">
                    {sections.map((section, index) => {
                        const isActive = activeSection === section.id;
                        const isHovered = hoveredItem === section.id;
                        
                        return (
                            <div 
                                key={section.id}
                                className="relative group cursor-pointer"
                                onClick={() => handleNavClick(section.id)}
                                onMouseEnter={() => setHoveredItem(section.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {/* Icon glow background */}
                                <div 
                                    className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                                        isActive ? 'scale-150' : isHovered ? 'scale-130' : 'scale-120'
                                    }`}
                                    style={{
                                        background: isActive 
                                            ? 'radial-gradient(circle, rgba(164,112,227,0.6) 0%, rgba(139,69,196,0.3) 50%, transparent 80%)'
                                            : 'radial-gradient(circle, rgba(164,112,227,0.3) 0%, rgba(139,69,196,0.15) 50%, transparent 70%)',
                                        filter: 'blur(12px)'
                                    }}
                                />

                                {/* Active pulse ring */}
                                {isActive && (
                                    <div 
                                        className="absolute inset-0 border-2 border-violet-400/60 rounded-xl"
                                        style={{
                                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                        }}
                                    />
                                )}
                                
                                {/* Icon container */}
                                <div 
                                    className={`relative flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-500 ${
                                        isActive ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'
                                    }`}
                                    style={{
                                        background: isActive 
                                            ? 'linear-gradient(135deg, rgba(164,112,227,0.4), rgba(139,69,196,0.6))'
                                            : isHovered
                                                ? 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(164,112,227,0.3))'
                                                : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(164,112,227,0.2))',
                                        backdropFilter: 'blur(10px)',
                                        border: isActive 
                                            ? '1px solid rgba(164,112,227,0.6)' 
                                            : '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: isActive 
                                            ? '0 8px 25px rgba(164,112,227,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                                            : '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                                    }}
                                >
                                    <Image
                                        src={section.icon}
                                        alt={section.label}
                                        height={24}
                                        width={24}
                                        className={`transition-all duration-300 ${
                                            isActive 
                                                ? 'brightness-125 saturate-125' 
                                                : 'brightness-110 saturate-110'
                                        }`}
                                        style={{
                                            filter: isActive 
                                                ? 'drop-shadow(0 4px 12px rgba(164,112,227,0.8))' 
                                                : 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))'
                                        }}
                                    />

                                    {/* Active indicator dots */}
                                    {isActive && (
                                        <>
                                            <div 
                                                className="absolute -top-1 -right-1 w-2 h-2 bg-violet-400 rounded-full"
                                                style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                                            />
                                            <div 
                                                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full"
                                                style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '0.7s' }}
                                            />
                                        </>
                                    )}
                                </div>
                                
                                {/* Enhanced tooltip */}
                                <div 
                                    className={`absolute right-full mr-6 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none ${
                                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                                    }`}
                                >
                                    <div 
                                        className="relative px-4 py-2 rounded-lg backdrop-blur-md border whitespace-nowrap"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(164,112,227,0.3) 50%, rgba(0,0,0,0.9) 100%)',
                                            borderColor: 'rgba(164,112,227,0.5)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                                            color: 'white',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                                        }}
                                    >
                                        {section.label}
                                        
                                        {/* Tooltip arrow */}
                                        <div 
                                            className="absolute left-full top-1/2 -translate-y-1/2"
                                            style={{
                                                borderTop: '6px solid transparent',
                                                borderBottom: '6px solid transparent',
                                                borderLeft: '8px solid rgba(0,0,0,0.8)',
                                                filter: 'drop-shadow(2px 0 4px rgba(164,112,227,0.3))'
                                            }}
                                        />

                                        {/* Top highlight */}
                                        <div 
                                            className="absolute top-1 left-2 right-2 h-0.5 rounded-full"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(164,112,227,0.8), transparent)'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>

            {/* Ground shadow */}
            <div 
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 ${
                    isNavHovered ? 'scale-120 opacity-50' : 'scale-100 opacity-30'
                }`}
                style={{
                    width: '100px',
                    height: '20px',
                    background: 'radial-gradient(ellipse, rgba(164,112,227,0.4) 0%, transparent 70%)',
                    filter: 'blur(10px)'
                }}
            />
        </div>
    );
}