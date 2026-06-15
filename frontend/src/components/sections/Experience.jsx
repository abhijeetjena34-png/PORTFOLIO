import { motion } from "framer-motion";
import {  GraduationCap } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Master in Computer Applications (MCA)",
    company: "Completed",
    date: "2024 - 2026",
    description: "Deep-diving into advanced software engineering and full-stack development. Building a strong foundation in computer science principles and modern frameworks.",
    icon: <GraduationCap size={20} />,
    type: "education"
  },
  {
    title: "Bachelor's Degree (+3) - Chemistry Honours",
    company: "Graduated with Excellence",
    date: "2021 - 2024",
    description: "Completed undergraduate studies in Chemistry, developing strong analytical thinking, problem-solving skills, and a scientific approach to complex challenges.",
    icon: <GraduationCap size={20} />,
    type: "education"
  },
  {
    title: "Higher Secondary (+2 Science)",
    company: "Science Stream",
    date: "2019 - 2021",
    description: "Focused on Mathematics, Physics, and Chemistry, establishing the technical and analytical baseline for my transition into technology.",
    icon: <GraduationCap size={20} />,
    type: "education"
  },
  {
    title: "High School (10th)",
    company: "Secondary Education",
    date: "Passed in 2019",
    description: "Completed secondary education with a strong focus on core science and mathematics.",
    icon: <GraduationCap size={20} />,
    type: "education"
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My Education <span className="text-gradient-purple">& Journey</span>
          </h2>
          <p className="text-gray-400 text-lg">A timeline of my academic and professional growth.</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
          {EXPERIENCES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[20px] top-1 bg-primary-600 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center text-white shadow-lg shadow-primary-500/30 z-10">
                {item.icon}
              </div>
              
              <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{item.title}</h3>
                  <span className="text-xs font-bold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <h4 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {item.company}
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
