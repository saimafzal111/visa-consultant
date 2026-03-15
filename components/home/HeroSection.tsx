"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, FileCheck, BrainCircuit } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background pt-[120px] pb-[100px] z-0">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block border border-primary/20">
              AI-Powered Visa Guidance
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Navigate Your Global Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Confidence</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the right visa, check your eligibility, and get step-by-step guidance tailored to your unique profile in minutes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/visa-check">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full group w-full cursor-pointer">
                Start Your Visa Check
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full cursor-pointer">
                Explore Destinations
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-card border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Smart Suggestions</h3>
            <p className="text-muted-foreground text-sm">Our AI analyzes your profile instantly to recommend the best visa types.</p>
          </div>

          <div className="bg-card border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
              <Globe2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">100+ Destinations</h3>
            <p className="text-muted-foreground text-sm">Get real-time visa requirements and processing times globally.</p>
          </div>

          <div className="bg-card border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-500">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Eligibility Score</h3>
            <p className="text-muted-foreground text-sm">Know your chances before you apply with our advanced scoring system.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
