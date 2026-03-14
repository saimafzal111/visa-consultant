"use client";

import { motion } from "framer-motion";
import { Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const regions = [
  {
    name: "North America",
    countries: [
      { name: "United States", difficulty: "Medium", rate: "75%" },
      { name: "Canada", difficulty: "Medium", rate: "80%" },
      { name: "Mexico", difficulty: "Easy", rate: "95%" },
    ]
  },
  {
    name: "Europe",
    countries: [
      { name: "Schengen Area", difficulty: "Hard", rate: "60%" },
      { name: "United Kingdom", difficulty: "Medium", rate: "82%" },
      { name: "Ireland", difficulty: "Easy", rate: "90%" },
    ]
  },
  {
    name: "Asia Pacific",
    countries: [
      { name: "Australia", difficulty: "Easy", rate: "88%" },
      { name: "Japan", difficulty: "Easy", rate: "96%" },
      { name: "China", difficulty: "Hard", rate: "55%" },
    ]
  }
];

export function RequirementsHeatmap() {
  const getDifficultyColor = (level: string) => {
    switch(level) {
      case 'Easy': return 'bg-green-500 hover:bg-green-600 text-white border-none shadow-[0_0_15px_rgba(34,197,94,0.4)]';
      case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600 text-white border-none shadow-[0_0_15px_rgba(234,179,8,0.4)]';
      case 'Hard': return 'bg-red-500 hover:bg-red-600 text-white border-none shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      default: return 'bg-muted';
    }
  };

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Map className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Visa Difficulty Heatmap</h2>
          <p className="text-lg text-muted-foreground mb-8">
            An overview of visa application difficulty across popular global regions, dynamically updated based on recent approval rates.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Easy (&gt;85%)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Medium (70-85%)</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Hard (&lt;70%)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {regions.map((region, idx) => (
            <motion.div 
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">{region.name}</h3>
              <div className="space-y-4">
                {region.countries.map((country) => (
                  <div key={country.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="font-medium text-sm">{country.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground mr-1">{country.rate}</span>
                      <Badge className={getDifficultyColor(country.difficulty)}>
                        {country.difficulty}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
