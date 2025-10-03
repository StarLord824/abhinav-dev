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
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 [perspective:1000px] ${isActive ? 'scale-110' : ''}`}
            onClick={onClick}
        >
            {/* Ambient glow effect */}
            <div className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 bg-gradient-to-br from-violet-400/20 via-violet-400/15 to-purple-500/20 group-hover:scale-105 group-hover:from-violet-400/25 group-hover:via-violet-500/20 group-hover:to-purple-600/25`} />
            
            {/* Main button container with 3D effect */}
            <div 
                className={`relative flex flex-col justify-center items-center h-24 w-24 rounded-xl border-2 transition-all duration-300 overflow-hidden 
                ${isActive 
                    ? 'bg-gradient-to-br from-black/25 via-violet-500/15 to-black/30 border-violet-400/50 shadow-[0_8px_32px_rgba(164,112,227,0.3),_inset_0_1px_0_rgba(255,255,255,0.1)] [transform:rotateX(5deg)_rotateY(-5deg)] [transform-style:preserve-3d]' 
                    : 'bg-gradient-to-br from-black/15 via-black/20 to-black/25 border-black/20 30 group-hover:from-black/20 group-hover:via-black/25 group-hover:to-black/30 [transform:rotateX(5deg)_rotateY(-5deg)] [transform-style:preserve-3d] shadow-[0_4px_16px_rgba(0,0,0,0.2),_inset_0_1px_0_rgba(255,255,255,0.05)]'
                }`}
            >
                {/* Top highlight */}
                <div className={`absolute top-2 left-2 right-2 h-8 rounded-lg transition-all duration-300 bg-gradient-to-r from-white/20 via-white/15 to-white/10 group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/15 [translateZ:2px]`} />

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
                <div className={`absolute top-4 z-10 flex justify-center items-center w-8 h-8 mb-1 rounded-lg transition-all duration-300 ${
                    isActive 
                        ? 'bg-gradient-to-br from-white/20 to-violet-400/20 shadow-lg scale-110' 
                        : 'bg-gradient-to-br from-white/10 to-white/5 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:to-white/10'
                }`}>
                    <img 
                        src={logoPath} 
                        alt={`${text} icon`} 
                        className={`w-5 h-5 object-contain transition-all duration-300 ${
                            isActive 
                                ? 'brightness-[1.1] saturate-[1.1] drop-shadow-[0_2px_4px_rgba(164,112,227,0.3)]' 
                                : 'brightness-[0.9] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] group-hover:brightness-[1.05]'
                        }`} 
                    />
                </div>

                {/* Text */}
                <div className={`absolute top-15 flex justify-center items-center text-center text-xs z-10 font-medium transition-all duration-300 ${
                    isActive 
                        ? 'text-white font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.8),_0_0_8px_rgba(164,112,227,0.4)]' 
                        : 'text-white/80 group-hover:text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]'
                }`}>
                    {text}
                </div>

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
        </div>
    );
}
