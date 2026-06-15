import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechNova",
    content: "Working with this developer was an absolute pleasure. The attention to detail and the sheer quality of the animations blew us away. Our new platform looks stunning.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, StartupX",
    content: "A rare combination of design sensibility and hardcore engineering skills. The backend integration was flawless, and the frontend feels incredibly premium.",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    name: "Emma Davis",
    role: "Creative Director",
    content: "Finally, a developer who understands pixel-perfect design. The glassmorphism effects and smooth scroll reveals took our portfolio from good to world-class.",
    avatar: "https://i.pravatar.cc/150?u=emma",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take my word for it. Here's what people I've worked with have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl relative border border-white/5"
            >
              <Quote className="absolute top-6 right-6 text-white/10" size={48} />
              <div className="flex gap-4 items-center mb-6 relative z-10">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-primary-500/30"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-primary-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed relative z-10 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
