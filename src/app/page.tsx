import { TopChrome } from "@/components/sections/top-chrome";
import { BootSection } from "@/components/sections/boot-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <TopChrome />
      <BootSection />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </main>
  );
}
