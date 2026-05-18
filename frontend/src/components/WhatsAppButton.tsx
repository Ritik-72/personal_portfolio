import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export const WhatsAppButton = () => {
  const phoneNumber = '918847865910'; // Your actual number
  const message = 'Hi Ayusman, I saw your portfolio and would like to chat!';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[100] p-4 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/20 border border-white/20 flex items-center justify-center group"
    >
      <Phone size={24} />
      <span className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Chat on WhatsApp
      </span>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
    </motion.a>
  );
};
