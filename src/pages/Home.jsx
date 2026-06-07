import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Certifications } from "@/sections/Certifications";
import { Projects } from "@/sections/Projects";
import { FeaturedPosts } from "@/sections/FeaturedPosts";

export const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <Projects />
      <FeaturedPosts />
    </main>
  );
};
