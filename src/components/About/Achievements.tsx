'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award } from 'lucide-react';
import { useState } from 'react';

const achievements = [
  {
    title: 'Meta Hacker Cup 2025',
    description: 'Advanced to Round 2, ranking 3,252 globally in Round 1.',
    badge: 'Certificate Earned',
    rarity: 'Epic',
    points: '+100 pts'
  },
  // {
  //   title: 'HackMIT 2024 Winner',
  //   description: 'First place among 500+ participants for building an AI-powered code review assistant.',
  //   badge: 'Winner',
  //   rarity: 'Legendary',
  //   points: '+200 pts'
  // },
  // {
  //   title: 'Google HashCode 2024',
  //   description: 'Ranked in top 15% globally, solving complex optimization problems.',
  //   badge: 'Top Performer',
  //   rarity: 'Rare',
  //   points: '+75 pts'
  // }
];

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
      style={{ zIndex: isOpen ? 100 : 1 }}
    >
      <div className="w-full relative bg-gradient-to-br from-slate-900/90 via-amber-900/20 to-slate-900/90 rounded-xl border-2 border-yellow-400/30 overflow-visible backdrop-blur-sm shadow-lg hover:border-yellow-400/50 transition-all">
        {/* Animated corner accent */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full"
        />
        
        <div className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-white">{achievement.title}</h3>
              {/* Points Badge */}
              <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full border border-yellow-400/30">
                {achievement.points}
              </span>
            </div>
            {/* Rarity Badge */}
            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
              achievement.rarity === 'Legendary' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' :
              achievement.rarity === 'Epic' ? 'bg-pink-500/20 text-pink-300 border border-pink-400/30' :
              'bg-blue-500/20 text-blue-300 border border-blue-400/30'
            }`}>
              {achievement.rarity}
            </span>
          </div>
          
          {/* Info Icon - Hover to show popup with pulse animation */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-8 h-8 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 flex items-center justify-center cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>

            {/* Popover positioned right next to icon */}
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Background Blur Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] rounded-2xl"
                    onClick={() => setIsOpen(false)}
                  />
                  
                  {/* Popover Content - Positioned to Right of Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-[550px] z-[100]"
                  >
                    <div className="relative bg-slate-900 rounded-2xl border-2 border-yellow-400/40 p-8 shadow-2xl">
                      {/* Title */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>

                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/30">
                        <Award className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-300">{achievement.badge}</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        Achievements
      </h2>
      
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} index={index} />
        ))}
      </div>
    </div>
  );
}
