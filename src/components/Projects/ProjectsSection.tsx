'use client';
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
  return (
    <div className="w-full min-h-screen px-8 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white heavy-stroke-text mb-4">
          ⚔️ Card Collection
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Battle-tested projects forged in the arena of development
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
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
            20+
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            Technologies
          </div>
        </div>
      </div>
    </div>
  );
}
