'use client';

import { motion } from "motion/react";

interface Props {
    content: string;
    sectionId: string;
}

export default function Navigators(props: Props) {
    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    return (
        <motion.div 
            className="relative"
            whileHover="hover"
            whileTap="tap"
            variants={{
                hover: { scale: 1.02 },
                tap: { scale: 0.98 }
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <motion.button 
                onClick={() => handleNavClick(props.sectionId)}
                className="relative w-52 h-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 rounded-2xl"
                variants={{
                    hover: { y: -2 },
                    tap: { y: 1 }
                }}
            >
                {/* Main button container */}
                <motion.div 
                    className="flex justify-center items-center relative w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-2xl border-b-4 border-orange-600 shadow-lg"
                    variants={{
                        hover: { 
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2), inset 0px 4px 8px rgba(97, 82, 61, 0.3)",
                            borderBottomWidth: "6px"
                        },
                        tap: { 
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15), inset 0px 2px 4px rgba(97, 82, 61, 0.4)",
                            borderBottomWidth: "2px"
                        }
                    }}
                    style={{
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15), inset 0px 4px 4px rgba(97, 82, 61, 0.25)"
                    }}
                >
                    {/* Text content */}
                    <motion.div 
                        className="font-bold text-3xl text-black heavy-stroke-text select-none"
                        style={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3), -1px -1px 0px rgba(255, 255, 255, 0.8)"
                        }}
                        variants={{
                            hover: { scale: 1.05 },
                            tap: { scale: 0.95 }
                        }}
                    >
                        {props.content}
                    </motion.div>
                    
                    {/* Glossy highlight */}
                    <motion.div 
                        className="absolute w-1.5 h-2 top-1.5 right-2 bg-white rounded-full opacity-80"
                        style={{ transform: "rotate(-35deg)" }}
                        variants={{
                            hover: { 
                                scale: 1.2,
                                opacity: 0.9,
                                boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
                            },
                            tap: { 
                                scale: 0.9,
                                opacity: 0.7
                            }
                        }}
                    />
                    
                    {/* Additional highlight for depth */}
                    <motion.div 
                        className="absolute top-2 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                        variants={{
                            hover: { opacity: 0.6 },
                            tap: { opacity: 0.3 }
                        }}
                        initial={{ opacity: 0.4 }}
                    />
                </motion.div>
                
                {/* Subtle glow effect on hover */}
                <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-b from-yellow-200/20 to-yellow-400/20 pointer-events-none"
                    variants={{
                        hover: { opacity: 1 },
                        tap: { opacity: 0 }
                    }}
                    initial={{ opacity: 0 }}
                />
            </motion.button>
        </motion.div>
    );
}