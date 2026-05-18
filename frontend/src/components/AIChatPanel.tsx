import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Brain, Briefcase, Rocket } from 'lucide-react';
import { cn } from '../utils/cn';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

type ChatMode = 'general' | 'resume' | 'projects';

export const AIChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('general');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hi! I am Ayusman\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { label: "About Ayusman 👨‍💻", query: "Tell me about Ayusman" },
    { label: "Show Projects 🚀", query: "Show projects" },
    { label: "Skills? 💡", query: "Skills?" },
    { label: "Contact Details 📞", query: "Contact details?" }
  ];

  const handleSuggestionClick = (query: string) => {
    setInput('');
    handleSend(query);
  };

  const renderMessageContent = (content: string) => {
    // Escape HTML first to prevent basic injection
    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Replace bold text: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
    
    // Replace inline code: `code` -> font-mono code
    html = html.replace(/`(.*?)`/g, '<code class="bg-black/20 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-primary-400">$1</code>');

    // Handle bullet points / lines
    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('🔹')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">🔹</span><span>${trimmed.substring(1).trim()}</span></div>`;
      }
      if (trimmed.startsWith('💻')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">💻</span><span>${trimmed.substring(2).trim()}</span></div>`;
      }
      if (trimmed.startsWith('⚙️')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">⚙️</span><span>${trimmed.substring(2).trim()}</span></div>`;
      }
      if (trimmed.startsWith('🗄️')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">🗄️</span><span>${trimmed.substring(2).trim()}</span></div>`;
      }
      if (trimmed.startsWith('📧')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">📧</span><span>${trimmed.substring(2).trim()}</span></div>`;
      }
      if (trimmed.startsWith('🎓')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">🎓</span><span>${trimmed.substring(2).trim()}</span></div>`;
      }
      if (trimmed.startsWith('📍')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">📍</span><span>${trimmed.substring(2).trim()}</span></div>`;
      }
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return `<div class="flex items-start gap-2 my-1"><span class="text-primary-500 shrink-0">•</span><span>${trimmed.substring(1).trim()}</span></div>`;
      }
      return trimmed === '' ? '<br/>' : `<p class="mb-1">${line}</p>`;
    });

    return (
      <div 
        className="space-y-1 text-sm leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: processedLines.join('') }} 
      />
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    if (!customMessage) {
      setInput('');
    }
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, mode })
      });

      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const modes = [
    { id: 'general', label: 'General', icon: <Bot size={14} />, color: 'text-primary-500' },
    { id: 'resume', label: 'Resume Q&A', icon: <Briefcase size={14} />, color: 'text-amber-500' },
    { id: 'projects', label: 'Project Advisor', icon: <Rocket size={14} />, color: 'text-cyan-500' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-24 z-[100] p-4 rounded-full shadow-2xl border transition-all duration-300",
          isOpen
            ? "bg-rose-500 border-rose-500/20 text-white"
            : "glass-adaptive border-primary-500/20 text-primary-500"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-500"></span>
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-10rem)] glass-adaptive rounded-[2rem] shadow-2xl border border-white/10 z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary-500/10 to-cyan-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-500 rounded-xl text-white">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="font-bold font-outfit text-lg">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Online & Thinking</span>
                  </div>
                </div>
              </div>

              {/* Mode Selector */}
              <div className="flex gap-2 p-1 bg-black/10 rounded-xl">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id as ChatMode)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                      mode === m.id
                        ? "bg-white text-black shadow-sm"
                        : "text-foreground/40 hover:text-foreground/60"
                    )}
                  >
                    <span className={mode === m.id ? m.color : ""}>{m.icon}</span>
                    <span className="hidden sm:inline">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" data-lenis-prevent>
              {messages.map((msg, i) => (
                <div key={i} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex items-start gap-3",
                      msg.role === 'user' ? "flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      msg.role === 'bot' ? "bg-primary-500 text-white" : "bg-white/10 text-primary-400 border border-white/10"
                    )}>
                      {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={cn(
                      "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'bot'
                        ? "bg-white/5 border border-white/10 text-foreground/80 rounded-tl-none"
                        : "bg-primary-500 text-white rounded-tr-none shadow-lg shadow-primary-500/20"
                    )}>
                      {msg.role === 'bot' ? renderMessageContent(msg.content) : msg.content}
                    </div>
                  </motion.div>

                  {/* Suggestion Chips */}
                  {i === 0 && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 gap-2 pl-11 pr-2"
                    >
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion.query)}
                          className="p-3 text-left rounded-xl border border-white/5 bg-white/5 hover:bg-primary-500/10 hover:border-primary-500/30 transition-all text-xs text-foreground/75 hover:text-primary-400 flex items-center justify-between group active:scale-[0.98]"
                        >
                          <span>{suggestion.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-black/5 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full pl-6 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary-500 transition-all outline-none text-sm"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary-500 text-white rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 opacity-40 uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles size={10} className="text-amber-500" /> Powered by Ayusman AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
