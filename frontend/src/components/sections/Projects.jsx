import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Quickbite - Online Food Delivery",
    description: "A comprehensive online food ordering system allowing users to browse menus, place orders, and track delivery status.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    githubUrl: "https://github.com/abhijeetjena34-png/QUICK_BITE",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Redstore - E-Commerce Platform",
    description: "An e-commerce platform featuring product browsing, shopping cart functionality, secure checkout, and user account management.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    githubUrl: "https://github.com/abhijeetjena34-png/mern_project2",
    comingSoon: true,
  },
  {
    id: 3,
    title: "Weather Forecasting App",
    description: "A weather forecasting application providing real-time weather data and forecasts for locations worldwide.",
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript", "Weather API"],
    category: "Frontend",
    githubUrl: "https://github.com/abhijeetjena34-png/Weather_Project",
  },
];


const CATEGORIES = [
  { name: "All", color: "primary" },
  { name: "Frontend", color: "secondary" },
  { name: "Backend", color: "tertiary" },
  { name: "Full Stack", color: "accent" },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Backend") {
      return project.category === "Backend" || project.category === "Full Stack";
    }
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            A selection of my recent work. Explore my projects spanning frontend interfaces to full-stack architectures.
          </p>
 
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? `bg-${cat.color}-600 text-white shadow-lg shadow-${cat.color}-500/20`
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    ) : project.comingSoon ? (
                      <span className="flex items-center gap-2 text-sm font-medium text-yellow-500">
                        <ExternalLink size={16} /> Coming Soon 🚀
                      </span>
                    ) : null}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={16} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
