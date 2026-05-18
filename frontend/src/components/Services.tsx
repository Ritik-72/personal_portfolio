import { motion } from 'framer-motion';
import { Globe, Server, Cloud, Cpu, BrainCircuit, Rocket } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'High-performance, responsive websites built with the latest technologies.',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'API Development',
    description: 'Scalable and secure RESTful & GraphQL APIs tailored to your needs.',
    icon: <Server className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Cloud Deployment',
    description: 'Optimized cloud infrastructure setup and management.',
    icon: <Cloud className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'AI Integrations',
    description: 'Leveraging AI/ML to add intelligent features to your applications.',
    icon: <BrainCircuit className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Automation',
    description: 'Custom scripts and tools to automate repetitive tasks.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Performance Optimization',
    description: 'Speeding up your existing applications for better UX.',
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-primary-500 to-indigo-500',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-outfit mb-4">Services I <span className="text-gradient">Offer</span></h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Providing end-to-end digital solutions that help businesses grow and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 text-white mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 font-outfit">{service.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
