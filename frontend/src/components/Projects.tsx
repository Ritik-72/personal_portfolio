import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Github, ExternalLink, Star, GitFork, Search, X, Play, Sparkles } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { cn } from '../utils/cn';

const projects = [
  {
    title: 'Ama Sathi WhatsApp Chatbot',
    description: 'An intelligent WhatsApp-based government service integration platform for the Odisha Government, providing seamless access to public services.',
    image: '/src/assets/amasathi.jpg',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-with-glowing-lines-34534-large.mp4',
    tech: ['FastAPI', 'Python', 'WhatsApp API', 'PostgreSQL'],
    github: 'https://github.com',
    link: 'https://example.com',
    stars: 450,
    forks: 89,
    category: 'GovTech'
  },
  {
    title: 'AI Market Intelligence',
    description: 'A comprehensive platform for analyzing market trends using neural networks and real-time data streaming.',
    image: 'https://images.unsplash.com/photo-1611974715853-2b8ef9a4d846?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-data-nodes-34533-large.mp4',
    tech: ['React', 'Python', 'FastAPI', 'PyTorch'],
    github: 'https://github.com',
    link: 'https://example.com',
    stars: 124,
    forks: 42,
    category: 'AI / ML'
  },
  {
    title: 'EcoSphere Dashboard',
    description: 'Real-time environmental monitoring system with interactive 3D visualizations and historical data analysis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-typing-on-a-laptop-4835-large.mp4',
    tech: ['Next.js', 'Three.js', 'Tailwind', 'PostgreSQL'],
    github: 'https://github.com',
    link: 'https://example.com',
    stars: 89,
    forks: 15,
    category: 'Web Dev'
  },

  {
    title: 'Quantum Wallet',
    description: 'Secure cryptocurrency wallet with multi-chain support and advanced biometric authentication.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-with-glowing-lines-34534-large.mp4',
    tech: ['React Native', 'Rust', 'Web3.js', 'Solidity'],
    github: 'https://github.com',
    link: 'https://example.com',
    stars: 178,
    forks: 31,
    category: 'Blockchain'
  }
];

const categories = ['All', 'GovTech', 'Web Dev', 'AI / ML', 'SaaS', 'Blockchain'];

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === 'All' || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section id="projects" className="py-12 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A selection of my recent works, ranging from enterprise-level AI platforms to experimental web technologies.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === cat
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                    : "glass-adaptive hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const chatBtn = document.querySelector('button[class*="fixed bottom-6 right-24"]') as HTMLButtonElement;
                if (chatBtn) chatBtn.click();
              }}
              className="px-6 py-2 rounded-full text-sm font-medium glass-adaptive border-amber-500/30 text-amber-500 hover:bg-amber-500/10 flex items-center gap-2"
            >
              <Sparkles size={16} /> AI Recommend
            </motion.button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-primary-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onPreview={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-foreground/40"
          >
            <p className="text-lg">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, onPreview }: { project: typeof projects[0], onPreview: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
        className="h-full"
      >
        <div className="group relative h-full glass-adaptive rounded-[2rem] overflow-hidden border border-white/10 flex flex-col">
          {/* Media Section */}
          <div className="relative aspect-video overflow-hidden">
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.video
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button
                onClick={onPreview}
                className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
              >
                <Play size={20} fill="currentColor" />
              </button>
            </div>

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full glass-adaptive text-[10px] font-bold uppercase tracking-widest text-primary-400 border border-primary-500/20">
                {project.category}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold font-outfit">{project.title}</h3>
              <div className="flex items-center gap-4 text-foreground/40 text-xs">
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {project.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={12} className="text-primary-400" /> {project.forks}</span>
              </div>
            </div>

            <p className="text-foreground/60 text-sm mb-6 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-[10px] font-bold border border-primary-500/20">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <a
                href={project.github}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary-500 transition-colors"
              >
                <Github size={18} /> Source
              </a>
              <a
                href={project.link}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary-500 transition-colors"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: typeof projects[0], onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl glass-adaptive rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row h-[80vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-adaptive hover:bg-white/10 transition-colors z-30"
        >
          <X size={24} />
        </button>

        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-4xl font-bold font-outfit text-white mb-2">{project.title}</h2>
            <div className="flex gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 p-8 flex flex-col bg-black/20 backdrop-blur-3xl overflow-y-auto">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-400 mb-4">About Project</h3>
          <p className="text-foreground/70 text-sm leading-relaxed mb-8">
            {project.description}
            <br /><br />
            This project demonstrates advanced implementation of {project.tech[0]} and {project.tech[1]}, focusing on user experience and technical efficiency.
          </p>

          <div className="space-y-6 mt-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xl font-bold text-amber-400">{project.stars}</p>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Stars</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xl font-bold text-primary-400">{project.forks}</p>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Forks</p>
              </div>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              Visit Site <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
