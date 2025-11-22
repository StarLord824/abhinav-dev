'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Send, User, MessageSquare, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full min-h-screen px-8 py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white heavy-stroke-text mb-4">
            📬 Quest Submission
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's team up and build something amazing!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-8 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Quest Request
                  </>
                )}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center"
                >
                  ✅ Quest received! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Quick Contact */}
            <div className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-6 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-4">Quick Contact</h4>
              <div className="space-y-3">
                <a
                  href="mailto:shuklaabhinav824@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  shuklaabhinav824@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-6 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-4">Connect With Me</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'GitHub', url: 'https://github.com/StarLord824', color: 'hover:bg-gray-700' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shuklaabhinav824', color: 'hover:bg-blue-600' },
                  { name: 'Twitter', url: 'https://twitter.com/shukla_abhi_nav', color: 'hover:bg-sky-500' },
                  { name: 'Discord', url: 'https://discord.gg/starlord_009', color: 'hover:bg-indigo-600' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-center font-semibold transition-all ${social.color}`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Coding Profiles */}
            <div className="relative bg-gradient-to-br from-black/60 via-slate-900/80 to-black/70 rounded-2xl border border-white/20 p-6 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-4">Coding Profiles</h4>
              <div className="space-y-3">
                {[
                  { name: 'LeetCode', url: 'https://leetcode.com/shuklaabhinav824' },
                  { name: 'Codeforces', url: 'https://codeforces.com/profile/StarLord024' },
                ].map((profile, idx) => (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-gray-300 hover:text-yellow-400 hover:border-yellow-400/50 transition-all"
                  >
                    {profile.name} →
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
