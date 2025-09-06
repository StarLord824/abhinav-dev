'use client'

interface NavButtonProps {
    logoPath: string;
    text: string;
    isActive?: boolean;
    onClick?: () => void;
}

export default function NavButton({ logoPath, text, isActive = false, onClick }: NavButtonProps) {
    return (
        <div 
            className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                isActive ? 'scale-110' : ''
            }`}
            onClick={onClick}
            style={{
                perspective: '1000px',
                animation: 'gentle-float 4s ease-in-out infinite'
            }}
        >
            {/* Ambient glow effect */}
            <div className={`absolute inset-0 rounded-[12px] blur-md transition-all duration-500 ${
                isActive 
                    ? 'bg-gradient-to-br from-[#A470E3]/40 via-violet-500/30 to-purple-600/40 scale-110' 
                    : 'bg-gradient-to-br from-[#A470E3]/20 via-violet-400/15 to-purple-500/20 group-hover:scale-105'
            }`}></div>
            
            {/* Main button container with 2.5D effect */}
            <div 
                className={`relative flex flex-col justify-center items-center h-24 w-24 rounded-[10px] border-[3px] transition-all duration-500 overflow-hidden ${
                    isActive 
                        ? 'bg-gradient-to-br from-black/25 via-[#A470E3]/15 to-black/30 border-[#A470E3]/50 shadow-2xl' 
                        : 'bg-gradient-to-br from-black/15 via-black/20 to-black/25 border-black/20 group-hover:border-[#A470E3]/30'
                }`}
                style={{
                    transform: 'rotateX(5deg) rotateY(-5deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: isActive 
                        ? '0 8px 32px rgba(164, 112, 227, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                        : '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
            >
                {/* Top highlight with enhanced glassmorphism */}
                <div className={`absolute top-[8px] left-[8px] right-[8px] h-8 rounded-lg transition-all duration-500 ${
                    isActive 
                        ? 'bg-gradient-to-r from-white/30 via-[#A470E3]/20 to-white/25' 
                        : 'bg-gradient-to-r from-white/20 via-white/15 to-white/10 group-hover:from-white/25'
                }`} style={{ transform: 'translateZ(2px)' }}/>
                
                {/* Side depth effects for 2.5D */}
                <div className={`absolute right-[-3px] top-0 bottom-0 w-1 rounded-r-[7px] transition-colors duration-500 ${
                    isActive 
                        ? 'bg-gradient-to-b from-[#A470E3]/40 to-purple-700/60' 
                        : 'bg-gradient-to-b from-black/30 to-black/50'
                }`} style={{ transform: 'rotateY(90deg) translateZ(1px)' }}/>
                
                <div className={`absolute bottom-[-3px] left-0 right-0 h-1 rounded-b-[7px] transition-colors duration-500 ${
                    isActive 
                        ? 'bg-gradient-to-r from-[#A470E3]/40 to-purple-700/60' 
                        : 'bg-gradient-to-r from-black/30 to-black/50'
                }`} style={{ transform: 'rotateX(90deg) translateZ(1px)' }}/>
                
                {/* Logo container with enhanced styling */}
                <div className={`relative z-10 flex justify-center items-center w-8 h-8 mb-1 rounded-lg transition-all duration-500 ${
                    isActive 
                        ? 'bg-gradient-to-br from-white/20 to-[#A470E3]/20 shadow-lg scale-110' 
                        : 'bg-gradient-to-br from-white/10 to-white/5 group-hover:scale-105 group-hover:bg-white/15'
                }`}>
                    <img 
                        src={logoPath} 
                        alt={`${text} icon`} 
                        className={`w-5 h-5 object-contain transition-all duration-500 ${
                            isActive 
                                ? 'filter brightness-110 saturate-110' 
                                : 'filter brightness-90 group-hover:brightness-105'
                        }`}
                        style={{
                            filter: isActive 
                                ? 'brightness(1.1) saturate(1.1) drop-shadow(0 2px 4px rgba(164,112,227,0.3))' 
                                : 'brightness(0.9) group-hover:brightness(1.05)'
                        }}
                    />
                </div>
                
                {/* Text with enhanced typography */}
                <div className={`flex justify-center items-center text-center text-xs z-10 font-medium transition-all duration-500 ${
                    isActive 
                        ? 'text-white font-semibold drop-shadow-lg' 
                        : 'text-white/80 group-hover:text-white/95'
                }`}>
                    {text}
                </div>
                
                {/* Active state indicator */}
                {isActive && (
                    <div className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-[#A470E3] to-transparent rounded-full animate-pulse"></div>
                )}
                
                {/* Floating micro-particles for active state */}
                {isActive && (
                    <>
                        <div className="absolute -top-1 -left-1 w-1 h-1 bg-[#A470E3]/60 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -right-1 w-0.5 h-0.5 bg-violet-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-2 -right-2 w-0.5 h-0.5 bg-purple-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </>
                )}
            </div>

            <style jsx>{`
                @keyframes gentle-float {
                    0%, 100% {
                        transform: translateY(0px) rotateX(5deg) rotateY(-5deg);
                    }
                    50% {
                        transform: translateY(-2px) rotateX(6deg) rotateY(-4deg);
                    }
                }
            `}</style>
        </div>
    );
}