import { Navbar } from "./components/shared/Navbar";
import { CustomCursor } from "./components/shared/CustomCursor";
import { Footer } from "./components/shared/Footer";
import { MusicPlayer } from "./components/shared/MusicPlayer";
import { Particles } from "./components/shared/Particles";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Services } from "./components/sections/Services";
import { Experience } from "./components/sections/Experience";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";

function App() {
  return (
    <div className="flex flex-col w-full relative min-h-screen">
      <svg className="fixed inset-0 z-0 opacity-15 pointer-events-none w-full h-full brightness-50 contrast-150" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <Particles />
      <CustomCursor />
      <MusicPlayer />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
