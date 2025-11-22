'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Code2, Zap, Users, Trophy } from 'lucide-react';

const stats = [
  { icon: Code2, label: 'Years of XP', value: '2+', color: 'text-cyan-400' },
  { icon: Zap, label: 'Projects Built', value: '20+', color: 'text-yellow-400' },
  { icon: Users, label: 'Collaborations', value: '10+', color: 'text-purple-400' },
  { icon: Trophy, label: 'Achievements', value: '15+', color: 'text-orange-400' },
];

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'GraphQL'] },
  { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma', 'Vercel'] },
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java', 'Go'] },
];

const timeline = [
  {
    year: '2023 - Present',
    role: 'Full Stack Developer',
    company: 'Freelance',
    description: 'Building modern web applications with cutting-edge technologies',
    color: 'from-violet-500 to-purple-600'
  },
  {
    year: '2022 - 2023',
    role: 'Frontend Developer',
    company: 'Tech Startup',
    description: 'Developed responsive UIs and interactive components',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    year: '2021 - 2022',
    role: 'Learning & Building',
    company: 'Self-taught',
    description: 'Mastered web development fundamentals and modern frameworks',
    color: 'from-green-500 to-emerald-600'
  },
];

export default function AboutSection() {
  return (
    <div className="w-full min-h-screen px-8 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white heavy-stroke-text mb-4">
          👤 Player Profile
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Level 35 Full Stack Engineer • Quest: Building the Future
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-6 backdrop-blur-sm hover:border-white/40 transition-all">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <div className={`text-3xl font-bold ${stat.color} heavy-stroke-text`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Me */}
        <motion.div
          className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white heavy-stroke-text mb-6">
            🎮 About Me
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-300">
              <p>
                Hey there! I'm <span className="text-cyan-400 font-semibold">Abhinav Shukla</span>, a passionate Full Stack Developer who loves turning ideas into reality through code.
              </p>
              <p>
                With over 2 years of experience in web development, I specialize in building modern, scalable applications using cutting-edge technologies like React, Next.js, and Node.js.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or competing in coding challenges on platforms like Codeforces and LeetCode.
              </p>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
              <Image
                src="/banners/banner2.svg"
                alt="Developer workspace"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="text-xl font-bold text-purple-400 mb-4">
                {skillGroup.category}
              </h4>
              <div className="space-y-2">
                {skillGroup.items.map((item, i) => (
                  <div
                    key={i}
                    className="text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Battle Log (Timeline) */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white heavy-stroke-text mb-8 text-center">
            ⚔️ Battle Log
          </h3>
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-6 backdrop-blur-sm hover:border-white/40 transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`} />
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-48">
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {item.role}
                    </h4>
                    <div className="text-cyan-400 mb-2">{item.company}</div>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
