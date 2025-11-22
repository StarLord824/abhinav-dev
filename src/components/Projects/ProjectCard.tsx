'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

export type ProjectRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  techStack: { name: string; icon: string }[];
  rarity: ProjectRarity;
  liveUrl?: string;
  githubUrl?: string;
  impact?: string;
}

const rarityColors = {
  common: {
    border: 'border-gray-400',
    glow: 'rgba(156, 163, 175, 0.4)',
    gradient: 'from-gray-300 to-gray-500',
    text: 'text-gray-300'
  },
  rare: {
    border: 'border-blue-400',
    glow: 'rgba(59, 130, 246, 0.5)',
    gradient: 'from-blue-400 to-blue-600',
    text: 'text-blue-400'
  },
  epic: {
    border: 'border-purple-400',
    glow: 'rgba(168, 85, 247, 0.6)',
    gradient: 'from-purple-400 to-purple-600',
    text: 'text-purple-400'
  },
  legendary: {
    border: 'border-yellow-400',
    glow: 'rgba(250, 204, 21, 0.7)',
    gradient: 'from-yellow-300 via-orange-400 to-yellow-500',
    text: 'text-yellow-300'
  }
};

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = rarityColors[project.rarity];

  return (
    <motion.div
      className="relative group cursor-pointer [perspective:1000px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 ${
          isHovered ? 'scale-110 opacity-70' : 'scale-100 opacity-30'
        }`}
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`
        }}
      />

      {/* Main card */}
      <motion.div
        className={`relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border-2 ${colors.border} overflow-hidden backdrop-blur-sm [transform-style:preserve-3d]`}
        style={{
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px ${colors.glow}`
        }}
        animate={isHovered ? { rotateY: 2, rotateX: 2 } : { rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Rarity indicator */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
        
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* Rarity badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border ${colors.border} ${colors.text} text-xs font-bold uppercase tracking-wider`}>
            {project.rarity}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-white heavy-stroke-text">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-2 min-h-[2.5rem]">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <div
                key={idx}
                className="relative group/tech"
                title={tech.name}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 hover:bg-white/20 transition-all">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
            {project.techStack.length > 4 && (
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs text-white/70">
                +{project.techStack.length - 4}
              </div>
            )}
          </div>

          {/* Impact badge */}
          {project.impact && (
            <div className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded-lg border border-cyan-500/30">
              💎 {project.impact}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                View Battle
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-semibold transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isHovered ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}
