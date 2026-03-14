"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileSearch, CalendarRange, BriefcaseBusiness, PlaneTakeoff } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Determine Visa Type",
    description: "Use our AI Suggestion tool to find out exactly which visa subclass you need based on your purpose of travel.",
    icon: <FileSearch className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Gather Documentation",
    description: "Compile passports, bank statements, employment letters, and any specific documents required for your destination.",
    icon: <BriefcaseBusiness className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Check Eligibility",
    description: "Run your profile through our AI Eligibility Calculator to ensure your approval chances are high before paying fees.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Submit Application & Biometrics",
    description: "Lodge your application online or at the embassy. Schedule an appointment for biometrics and interviews if required.",
    icon: <CalendarRange className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Fly to Destination",
    description: "Once approved, book your tickets and pack your bags! You are ready to start your global journey.",
    icon: <PlaneTakeoff className="w-6 h-6" />,
  },
];

export function VisaRoadmap() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Your Visa Roadmap</h2>
          <p className="text-lg text-muted-foreground">
            Follow this simple, step-by-step guide to navigate the complex visa application process with ease.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start group mb-12 last:mb-0">
              {/* Connecting Line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[27px] top-[60px] bottom-[-48px] w-0.5 bg-muted group-hover:bg-primary/50 transition-colors duration-500"></div>
              )}

              {/* Icon Circle */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center mr-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm"
              >
                {step.icon}
              </motion.div>

              {/* Content Box */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="bg-card border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex-1"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-bold text-muted-foreground/50">Step {step.id}</span>
                  <div className="h-px flex-1 bg-border"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
