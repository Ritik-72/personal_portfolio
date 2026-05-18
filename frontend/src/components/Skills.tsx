import { motion } from 'framer-motion';
import { Database, Cloud, Terminal, Palette } from 'lucide-react';

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="animated-border-container group"
            >
              <div className="glass-card h-full p-8 flex flex-col items-start relative">
                {/* Gradient Glow */}
                <div 
                  className="card-glow" 
                  style={{ background: `radial-gradient(circle at center, ${category.glowColor}, transparent 70%)` }}
                />
                
                {/* Floating Icon Container */}
                <div className={`mb-8 p-5 rounded-3xl bg-gradient-to-br ${category.color} shadow-lg shadow-black/20 group-hover:animate-float`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 font-outfit group-hover:text-primary-400 transition-colors">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 rounded-xl bg-white/5 text-sm font-medium border border-white/10 group-hover:border-primary-500/30 group-hover:bg-primary-500/5 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
