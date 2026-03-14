import { HeroSection } from "@/components/home/HeroSection";
import { VisaSuggestionForm } from "@/components/home/VisaSuggestionForm";
import { VisaInformationDirectory } from "@/components/home/VisaInformationDirectory";
import { EligibilityScore } from "@/components/home/EligibilityScore";
import { VisaRoadmap } from "@/components/home/VisaRoadmap";
import { RequirementsHeatmap } from "@/components/home/RequirementsHeatmap";
import { ContactForm } from "@/components/home/ContactForm";
import { AIVisaAdvisor } from "@/components/home/AIVisaAdvisor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <HeroSection />
      <VisaSuggestionForm />
      <VisaInformationDirectory />
      <EligibilityScore />
      <VisaRoadmap />
      <RequirementsHeatmap />
      <ContactForm />
      <AIVisaAdvisor />
    </div>
  );
}
