import { motion } from "framer-motion";
import { Code2, MonitorSmartphone, Server, Rocket } from "lucide-react";

const SERVICES = [
  {
    icon: <MonitorSmartphone size={32} className="text-primary-500" />,
    title: "Frontend Development",
    description: "Creating highly interactive, responsive, and performant web interfaces using React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: <Server size={32} className="text-accent" />,
    title: "Backend Engineering",
    description: "Building scalable APIs, microservices, and robust database architectures using Node.js, Express, and MongoDB.",
  },
  {
    icon: <Code2 size={32} className="text-purple-500" />,
    title: "Full Stack Solutions",
    description: "End-to-end web application development, taking your idea from concept to deployment seamlessly.",
  },
  {
    icon: <Rocket size={32} className="text-pink-500" />,
    title: "Performance Optimization",
    description: "Auditing and optimizing existing web applications for maximum speed, SEO, and user experience.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative z-10 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I offer a wide range of web development services to help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/5 hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
