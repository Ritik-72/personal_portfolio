import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle, Phone } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-12 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-outfit mb-6">Let's <span className="text-gradient">Collaborate</span></h2>
            <p className="text-foreground/60 mb-12 max-w-md">
              Have a project in mind? Or just want to say hello?
              I'm always open to discussing new projects, creative ideas or original concepts.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20 text-primary-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-outfit">Email</h4>
                  <p className="text-foreground/60">goodmorningritik@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-outfit">Location</h4>
                  <p className="text-foreground/60">Joranda,Dhenkanal,Odisha,759014</p>
                </div>
              </div>
              <a
                href="https://wa.me/918847865910"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold font-outfit">WhatsApp</h4>
                  <p className="text-foreground/60 group-hover:text-emerald-400 transition-colors">+91 8847865910</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors placeholder:text-foreground/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors placeholder:text-foreground/30"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors placeholder:text-foreground/30"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors resize-none placeholder:text-foreground/30"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  <>Sent Successfully <CheckCircle2 size={18} /></>
                ) : status === 'error' ? (
                  <>Failed to Send <AlertCircle size={18} /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
