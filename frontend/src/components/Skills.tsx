import { motion } from 'framer-motion';
import { Database, Cloud, Terminal, Palette, Sparkles } from 'lucide-react';
import { SkillOrbit } from './SkillOrbit';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Palette className="w-10 h-10" />,
    color: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend Engineering',
    icon: <Terminal className="w-10 h-10" />,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    skills: ['Node.js', 'Python', 'FastAPI', 'Go', 'REST & GraphQL'],
  },
  {
    title: 'Database & Systems',
    icon: <Database className="w-10 h-10" />,
    color: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Prisma'],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-10 h-10" />,
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    skills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Linux'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative scroll-mt-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold font-outfit mb-6"
          >
            Technical <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A curated selection of my core competencies, leveraging modern tools and 
            best practices to build exceptional digital experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-2">
          {/* Skill Categories Left Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className="animated-border-container group"
              >
                <div className="glass-card h-full p-6 flex flex-col items-start relative">
                  {/* Gradient Glow */}
                  <div 
                    className="card-glow" 
                    style={{ background: `radial-gradient(circle at center, ${category.glowColor}, transparent 70%)` }}
                  />
                  
                  {/* Floating Icon Container */}
                  <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg shadow-black/20 group-hover:animate-float`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 font-outfit group-hover:text-primary-400 transition-colors">
                    {category.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg bg-white/5 text-xs font-medium border border-white/10 group-hover:border-primary-500/30 group-hover:bg-primary-500/5 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Orbit Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 flex items-center justify-center relative bg-white/5 dark:bg-black/10 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-md shadow-2xl overflow-hidden min-h-[450px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            
            <div className="absolute top-4 left-6 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary-400 font-bold font-outfit z-10 bg-primary-500/10 border border-primary-500/20 px-2.5 py-1 rounded-full">
              <Sparkles size={10} className="animate-spin-slow text-primary-400" /> 3D Skill Core
            </div>
            
            <SkillOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
