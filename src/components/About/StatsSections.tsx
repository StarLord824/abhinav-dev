'use client';

import { Code2, Trophy, Zap, Target, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function StatsSection() {
    const stats = [
        { icon: Code2, label: 'Projects Built', value: '15+', color: 'from-blue-400 to-cyan-400' },
        { icon: Trophy, label: 'Achievements', value: '3', color: 'from-yellow-400 to-orange-400' },
        { icon: Zap, label: 'Tech Stack', value: '20+', color: 'from-purple-400 to-pink-400' },
        { icon: Target, label: 'Experience', value: '2Y', color: 'from-green-400 to-emerald-400' }
    ];

    return (
        <div>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Quick Stats
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 rounded-xl border-2 border-white/10 p-4 backdrop-blur-sm hover:border-white/20 transition-all overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    
                    <div className="text-xs text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>

                  {/* Animated corner indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br ${stat.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    );
}