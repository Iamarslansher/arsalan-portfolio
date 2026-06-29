import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Projects />
        <Education />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
