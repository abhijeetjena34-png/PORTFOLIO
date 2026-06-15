import { motion } from "framer-motion";
import profilePic from "../../assets/profile.jpg";

export function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-12 overflow-hidden relative"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
                <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8">
                  <p>
                    My name is <span className="text-white font-medium">Abhijeet Jena</span>, an MCA graduate and aspiring Full‑Stack Developer. I have hands‑on experience with React.js, Node.js, Express.js, and MongoDB. I enjoy building web applications, solving problems, and continuously learning new technologies to improve my development skills.
                  </p>
                </div>
                </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Decorative border/glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                
                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 glass">
                  <img
                    src={profilePic} // Uses the imported image asset
                    alt="Abhijeet Jena"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"; // Fallback
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
