'use client';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Code2, Database, Wrench, BookOpen } from 'lucide-react';
import { useState } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Recoil', 'Framer Motion'],
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    title: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Express.js', 'WebSockets', 'GraphQL', 'gRPC'],
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Tools & Technologies',
    icon: Wrench,
    skills: ['Git', 'Linux', 'Docker', 'Kubernetes', 'AWS', 'LangChain', 'PostgreSQL', 'MongoDB', 'Redis'],
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    title: 'Coursework',
    icon: BookOpen,
    skills: ['DBMS', 'Operating Systems', 'Computer Networking', 'OOPS', 'Machine Learning'],
    gradient: 'from-emerald-500 to-teal-600'
  }
];

function SkillCategoryCard({ 
  category, 
  index, 
  isOpen, 
  onToggle 
}: { 
  category: typeof skillCategories[0], 
  index: number,
  isOpen: boolean,
  onToggle: () => void
}) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 rounded-2xl border-2 border-white/10 overflow-hidden backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 shadow-lg">
        {/* Top gradient bar */}
        <div className={`h-1 bg-gradient-to-r ${category.gradient}`} />
        
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">{category.title}</h3>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-purple-300" />
          </motion.div>
        </button>
        
        {/* Skills List */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-3 py-1.5 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 text-sm text-gray-200 hover:border-purple-400/50 hover:bg-white/15 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(2); // Tools & Technologies open initially

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <Code2 className="w-6 h-6 text-purple-400" />
        Skills & Expertise
      </h2>
      <div className="space-y-3">
        {skillCategories.map((category, index) => (
          <SkillCategoryCard 
            key={index} 
            category={category} 
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
