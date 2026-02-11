'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';

const experiences = [
  {
    role: 'Software Engineering Fellow',
    company: 'Headstarter AI',
    location: 'Remote',
    duration: 'July 2024 - October 2024',
    xp: '+500 XP',
    level: 'Advanced',
    highlights: [
      'Built and deployed 3 AI-powered applications using Generative AI and cloud services.',
      'Developed a scalable price tracking platform with Next.js + TypeScript, deployed on AWS with Firebase, handling real-time price aggregation across multiple sources.',
      'Designed modular UI components and integrated GraphQL APIs to minimize overfetching and improve query efficiency.'
    ]
  },
  {
    role: 'Software Development Intern',
    company: 'Tech Innovations Inc.',
    location: 'Hybrid',
    duration: 'January 2024 - June 2024',
    xp: '+350 XP',
    level: 'Intermediate',
    highlights: [
      'Developed RESTful APIs using Node.js and Express, serving 10,000+ daily requests with 99.9% uptime.',
      'Implemented Redis caching layer reducing database queries by 60% and improving response times by 40%.',
      'Collaborated with cross-functional teams using Agile methodologies to deliver features on schedule.'
    ]
  },
  {
    role: 'Full Stack Development Intern',
    company: 'StartupHub',
    location: 'Remote',
    duration: 'June 2023 - December 2023',
    xp: '+250 XP',
    level: 'Beginner',
    highlights: [
      'Built responsive web applications using React, TypeScript, and Tailwind CSS for 5+ client projects.',
      'Integrated third-party APIs including Stripe for payments and SendGrid for email notifications.',
      'Optimized application performance achieving 95+ Lighthouse scores across all metrics.'
    ]
  }
];

function ExperienceCard({ experience, index }: { experience: typeof experiences[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
      style={{ zIndex: isOpen ? 100 : 1 }}
    >
      <div className="w-full relative bg-gradient-to-br from-slate-900/90 via-cyan-900/20 to-slate-900/90 rounded-xl border-2 border-cyan-400/30 overflow-visible backdrop-blur-sm shadow-lg hover:border-cyan-400/50 transition-all">
        {/* <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600" /> */}
        
        {/* Animated corner accent */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-full"
        />
        
        <div className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white">{experience.role}</h3>
              {/* XP Badge */}
              <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full border border-cyan-400/30">
                {experience.xp}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-cyan-300 font-semibold">{experience.company}</span>
              <span className="text-gray-500">•</span>
              {/* Level Badge */}
              <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 rounded text-xs font-semibold">
                {experience.level}
              </span>
            </div>
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
              className="w-8 h-8 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 flex items-center justify-center cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className="fixed inset-0 bg-black/40 backdrop-bl] rounded-xl"
                    onClick={() => setIsOpen(false)}
                  />
                  
                  {/* Popover Content - Positioned to Right of Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-[700px] z-[100]"
                  >
                    <div className="relative bg-slate-900 rounded-2xl border-2 border-cyan-400/40 p-10 shadow-2xl">
                      {/* Top gradient bar */}
                      <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-5" />

                      {/* Title */}
                      <div className="mb-5">
                        <h3 className="text-2xl font-bold text-white mb-2">{experience.role}</h3>
                      </div>

                      {/* Company & Duration Info */}
                      <div className="mb-5">
                        <div className="flex flex-wrap items-center gap-2 text-base">
                          <span className="text-cyan-300 font-semibold">{experience.company}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{experience.location}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{experience.duration}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold text-cyan-300 mb-3">Key Highlights</h4>
                        {experience.highlights.map((point, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                            <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                          </div>
                        ))}
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

export default function WorkExperience() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-cyan-400" />
        Work Experience
      </h2>
      
      <div className="space-y-3">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>
    </div>
  );
}
