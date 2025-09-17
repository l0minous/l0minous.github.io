import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import FeaturedProjects from "@/components/sections/featured-projects";
import ExperienceSection from "@/components/sections/experience";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProjects />
        {/* <SkillsSection /> */}
        <ExperienceSection />
        {/* <TestimonialsSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}