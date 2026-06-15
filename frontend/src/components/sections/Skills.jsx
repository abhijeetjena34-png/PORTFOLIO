import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    color: "primary",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    color: "secondary",
    skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Mongoose", "JWT"],
  },
  {
    title: "Tools & Others",
    color: "tertiary",
    skills: ["Git", "GitHub", "Postman", "Responsive Design", "UI/UX Principles"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive list of technologies and tools I use to build
            high-performance, scalable, and visually stunning applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass p-8 rounded-2xl border border-white/5 hover:border-${category.color}-500/30 transition-colors`}
            >
              <h3 className="text-xl font-semibold mb-6 text-white">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-${category.color}-500/50 transition-all cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
