'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard, { Project } from './ProjectCard';

// Sample projects data - you can move this to a separate file or fetch from API
const projects: Project[] = [
  {
    id: '1',
    name: 'Aurora UI Library',
    description: 'A comprehensive UI component library with stunning animations and 3D effects built with React and Framer Motion.',
    thumbnail: '/banners/banner2.svg',
    techStack: [
      { name: 'React', icon: '/langs/javascript.svg' },
      { name: 'TypeScript', icon: '/langs/Typescript.svg' },
      { name: 'Tailwind', icon: '/langs/javascript.svg' },
    ],
    rarity: 'legendary',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/StarLord824',
    impact: 'Used by 1000+ developers'
  },
  {
    id: '2',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    thumbnail: '/banners/banner2.svg',
    techStack: [
      { name: 'Next.js', icon: '/langs/javascript.svg' },
      { name: 'PostgreSQL', icon: '/langs/python.svg' },
      { name: 'Stripe', icon: '/langs/javascript.svg' },
    ],
    rarity: 'epic',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/StarLord824',
    impact: '500+ active users'
  },
  {
    id: '3',
    name: 'Real-time Chat App',
    description: 'WebSocket-based chat application with rooms, direct messaging, and file sharing capabilities.',
    thumbnail: '/banners/banner2.svg',
    techStack: [
      { name: 'Node.js', icon: '/langs/javascript.svg' },
      { name: 'Socket.io', icon: '/langs/javascript.svg' },
      { name: 'MongoDB', icon: '/langs/python.svg' },
    ],
    rarity: 'rare',
    githubUrl: 'https://github.com/StarLord824',
    impact: '200+ messages/day'
  },
  {
    id: '4',
    name: 'AI Code Assistant',
    description: 'VS Code extension that provides intelligent code suggestions and refactoring using machine learning.',
    thumbnail: '/banners/banner2.svg',
    techStack: [
      { name: 'Python', icon: '/langs/python.svg' },
      { name: 'TensorFlow', icon: '/langs/python.svg' },
      { name: 'TypeScript', icon: '/langs/Typescript.svg' },
    ],
    rarity: 'epic',
    githubUrl: 'https://github.com/StarLord824',
    impact: '10K+ downloads'
  },
  {
    id: '5',
    name: 'Portfolio Template',
    description: 'Modern, responsive portfolio template with dark mode, animations, and blog integration.',
    thumbnail: '/banners/banner2.svg',
    techStack: [
      { name: 'Next.js', icon: '/langs/javascript.svg' },
      { name: 'Tailwind', icon: '/langs/javascript.svg' },
    ],
    rarity: 'rare',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/StarLord824',
  },
  {
    id: '6',
    name: 'Task Manager',
    description: 'Kanban-style task management tool with drag-and-drop, team collaboration, and analytics.',
    thumbnail: '/banners/banner2.svg',
    techStack: [
      { name: 'React', icon: '/langs/javascript.svg' },
      { name: 'Firebase', icon: '/langs/javascript.svg' },
    ],
    rarity: 'common',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/StarLord824',
  },
];


export default function ProjectsSection() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech.name));
    });
    return Array.from(techSet).sort();
  }, []);

  // Sort projects based on selected technologies
  const sortedProjects = useMemo(() => {
    if (selectedTechs.length === 0) return projects;

    return [...projects].sort((a, b) => {
      const aHasSelected = a.techStack.some(tech => selectedTechs.includes(tech.name));
      const bHasSelected = b.techStack.some(tech => selectedTechs.includes(tech.name));
      
      if (aHasSelected && !bHasSelected) return -1;
      if (!aHasSelected && bHasSelected) return 1;
      return 0;
    });
  }, [selectedTechs]);

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedTechs([]);
  };

  // Add keyboard listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isFilterOpen) {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFilterOpen]);

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-16 relative">
      <div className="flex gap-6 max-w-[1600px] mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Stats Footer */}
          <div className="mt-16 flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 heavy-stroke-text">
                {projects.length}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Total Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 heavy-stroke-text">
                {projects.filter(p => p.rarity === 'legendary' || p.rarity === 'epic').length}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Epic+ Builds
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 heavy-stroke-text">
                {allTechnologies.length}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Technologies
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel - Right Side (Desktop) */}
        <div className="hidden xl:block w-80 sticky top-8 h-fit">
          <AnimatePresence>
            {isFilterOpen ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80 rounded-3xl border-4 border-blue-600/80 overflow-hidden backdrop-blur-sm shadow-2xl"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.2), 0 0 40px rgba(59, 130, 246, 0.4)'
                }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 border-b-4 border-blue-800">
                  <h3 className="text-3xl font-bold text-white heavy-stroke-text text-center">
                    Filter
                  </h3>
                </div>

                {/* Filter Options */}
                <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {allTechnologies.map((tech) => (
                    <motion.button
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className="w-full flex items-center gap-4 bg-gradient-to-r from-slate-700/60 to-slate-800/60 hover:from-slate-600/70 hover:to-slate-700/70 rounded-xl px-4 py-3 border-2 border-slate-600/50 transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Checkbox */}
                      <div className={`w-10 h-10 rounded-lg border-3 flex items-center justify-center transition-all ${
                        selectedTechs.includes(tech)
                          ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-500'
                          : 'bg-slate-800/80 border-slate-500'
                      }`}>
                        {selectedTechs.includes(tech) && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </div>

                      {/* Label */}
                      <span className="text-xl font-bold text-white heavy-stroke-text flex-1 text-left">
                        {tech}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Clear Button */}
                <div className="p-6 pt-0">
                  <motion.button
                    onClick={clearFilters}
                    disabled={selectedTechs.length === 0}
                    className={`w-full py-4 rounded-2xl font-bold text-2xl heavy-stroke-text transition-all border-4 ${
                      selectedTechs.length === 0
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                    whileHover={selectedTechs.length > 0 ? { scale: 1.05 } : {}}
                    whileTap={selectedTechs.length > 0 ? { scale: 0.95 } : {}}
                  >
                    Clear
                  </motion.button>
                </div>

                {/* Selected Count Badge */}
                {selectedTechs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 -right-3 bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg heavy-stroke-text"
                  >
                    {selectedTechs.length}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsFilterOpen(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-2xl shadow-2xl border-4 border-blue-700 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-2xl font-bold heavy-stroke-text">Filter</span>
                {selectedTechs.length > 0 && (
                  <span className="bg-orange-500 text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                    {selectedTechs.length}
                  </span>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Filter Toggle Button */}
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="xl:hidden fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl border-4 border-blue-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {selectedTechs.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {selectedTechs.length}
            </span>
          )}
        </motion.button>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="xl:hidden fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-blue-900/95 z-50 overflow-y-auto border-l-4 border-blue-600"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-white heavy-stroke-text">
                      Filter
                    </h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-white hover:text-gray-300"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3 mb-6">
                    {allTechnologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className="w-full flex items-center gap-4 bg-gradient-to-r from-slate-700/60 to-slate-800/60 hover:from-slate-600/70 hover:to-slate-700/70 rounded-xl px-4 py-3 border-2 border-slate-600/50 transition-all"
                      >
                        <div className={`w-10 h-10 rounded-lg border-3 flex items-center justify-center transition-all ${
                          selectedTechs.includes(tech)
                            ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-500'
                            : 'bg-slate-800/80 border-slate-500'
                        }`}>
                          {selectedTechs.includes(tech) && (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xl font-bold text-white heavy-stroke-text flex-1 text-left">
                          {tech}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={clearFilters}
                    disabled={selectedTechs.length === 0}
                    className={`w-full py-4 rounded-2xl font-bold text-2xl heavy-stroke-text transition-all border-4 ${
                      selectedTechs.length === 0
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-700 text-gray-400'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-700 text-white'
                    }`}
                  >
                    Clear
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
