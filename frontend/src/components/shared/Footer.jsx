import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Decorative top border with multi-color gradient */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-500 via-secondary-500 via-tertiary-500 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <a href="#home" className="text-4xl font-black tracking-tighter">
              <span className="text-white">A</span>
              <span className="text-primary-500">J.</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Crafting premium digital experiences through innovative code and modern design. 
              Available for new projects and collaborations.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Github size={18} />, href: "#", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
                { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500/50 transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Navigation</h4>
            <ul className="space-y-3">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Contact</h4>
            <div className="space-y-4">
              <a 
                href="mailto:abhijeetjena34@gmail.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                  <Mail size={16} className="text-primary-400" />
                </div>
                <span className="text-sm">abhijeetjena34@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="text-sm">Available for Hire</span>
              </div>
            </div>
          </div>

          {/* Newsletter/CTA */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Let's Connect</h4>
            <p className="text-gray-400 text-sm">
              Ready to bring your ideas to life? Let's start a conversation.
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/20"
            >
              Start a Project
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs flex items-center gap-1">
            &copy; {new Date().getFullYear()} <span className="text-gray-300">Abhijeet Jena</span>. 
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> in India
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-500 hover:text-white text-xs transition-colors"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary-500 transition-colors">
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Decorative background blurs */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[100px]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-600/5 rounded-full blur-[100px]" />
    </footer>
  );
}
