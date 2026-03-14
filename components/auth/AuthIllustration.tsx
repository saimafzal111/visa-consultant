"use client";

import { motion } from "framer-motion";
import { Plane, Map, Globe2, FileCheck, Compass } from "lucide-react";

export function AuthIllustration() {
  return (
    <div className="relative hidden bg-zinc-950 md:flex flex-col items-center justify-center p-10 overflow-hidden isolate h-full min-h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 z-0"></div>
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-primary/30">
              <Globe2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Global Journey Starts Here</h2>
          <p className="text-zinc-300">
            Navigate the complexities of visas and immigration with our AI-powered guidance system.
          </p>
        </motion.div>

        <div className="relative h-64 w-full">
          {/* Plane flying around */}
          <motion.div
            animate={{ 
              x: [0, 80, -40, 0], 
              y: [0, -40, 40, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
          >
            <Plane className="w-12 h-12" />
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 bg-white/10 p-3 rounded-lg backdrop-blur-md border border-white/20"
          >
            <FileCheck className="w-6 h-6 text-green-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/20"
          >
            <Map className="w-6 h-6 text-blue-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-20 left-4 bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20"
          >
            <Compass className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
