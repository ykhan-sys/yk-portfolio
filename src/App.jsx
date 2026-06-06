import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Certifications } from "@/sections/Certifications";
import { Projects } from "@/sections/Projects";

import { Navbar } from "@/layout/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Certifications />
          <Projects />
        </main>
      </div>
    </>
  );
}

export default App;
