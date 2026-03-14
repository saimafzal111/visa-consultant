"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Clock, DollarSign, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Destination = typeof destinations[0];

const destinations = [
  {
    id: "us",
    country: "United States",
    type: "B1/B2 Tourist Visa",
    processingTime: "4-12 Weeks",
    fee: "$185",
    difficulty: "Medium",
    requirements: ["Valid Passport", "DS-160 Form", "Interview Required", "Proof of Funds"],
    image: "🇺🇸",
  },
  {
    id: "uk",
    country: "United Kingdom",
    type: "Standard Visitor Visa",
    processingTime: "3-6 Weeks",
    fee: "£115",
    difficulty: "Medium",
    requirements: ["Valid Passport", "Bank Statements (6 months)", "Employment Letter", "Itinerary"],
    image: "🇬🇧",
  },
  {
    id: "ca",
    country: "Canada",
    type: "Visitor Visa (Temporary Resident)",
    processingTime: "2-8 Weeks",
    fee: "$100 CAD",
    difficulty: "Medium",
    requirements: ["Valid Passport", "Biometrics", "Proof of Ties to Home Country", "Invitation Letter (optional)"],
    image: "🇨🇦",
  },
  {
    id: "au",
    country: "Australia",
    type: "Visitor Visa (Subclass 600)",
    processingTime: "1-4 Weeks",
    fee: "$190 AUD",
    difficulty: "Easy",
    requirements: ["Valid Passport", "Health Declaration", "Bank Statements", "Travel History"],
    image: "🇦🇺",
  },
  {
    id: "schengen",
    country: "Schengen Area",
    type: "Short-Stay Visa (Type C)",
    processingTime: "2-4 Weeks",
    fee: "€80",
    difficulty: "Hard",
    requirements: ["Valid Passport", "Travel Insurance (€30k min)", "Flight Itinerary", "Hotel Booking", "Sponsorship/Funds"],
    image: "🇪🇺",
  },
  {
    id: "jp",
    country: "Japan",
    type: "Temporary Visitor Visa",
    processingTime: "1-2 Weeks",
    fee: "¥3,000",
    difficulty: "Easy",
    requirements: ["Valid Passport", "Application Form", "Photo", "Flight & Hotel Itinerary"],
    image: "🇯🇵",
  },
];

export function VisaInformationDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const filteredDestinations = destinations.filter((dest) =>
    dest.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dest.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="directory" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Global Visa Directory</h2>
            <p className="text-lg text-muted-foreground">
              Explore visa requirements, processing times, and fees for top travel destinations around the world.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country or visa type..." 
              className="pl-10 h-12 rounded-full bg-muted/50 border-none focus-visible:ring-1"
            />
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer group h-full"
                  onClick={() => setSelectedDest(dest)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl group-hover:scale-110 transition-transform">{dest.image}</span>
                        <div>
                          <h3 className="font-bold text-xl">{dest.country}</h3>
                          <p className="text-sm text-muted-foreground">{dest.type}</p>
                        </div>
                      </div>
                      <Badge variant={dest.difficulty === 'Easy' ? 'default' : dest.difficulty === 'Medium' ? 'secondary' : 'destructive'} 
                             className={dest.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' : dest.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20' : ''}>
                        {dest.difficulty}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0 text-primary" />
                        <span>{dest.processingTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 shrink-0 text-primary" />
                        <span>{dest.fee}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-center text-primary text-xs font-bold uppercase tracking-wider gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ChevronDown className="-rotate-90 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Detailed Side Panel (Drawer) */}
          <AnimatePresence mode="wait">
            {selectedDest && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedDest(null)}
                  className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm cursor-pointer"
                />
                
                {/* Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed inset-y-0 right-0 z-[70] w-full max-w-lg bg-white dark:bg-zinc-950 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col h-full"
                >
                  {/* Close button for better UX */}
                  <button 
                    onClick={() => setSelectedDest(null)}
                    className="absolute top-6 right-6 z-[80] p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors text-white"
                  >
                    <ChevronDown className="h-6 w-6 rotate-90" />
                  </button>

                  <div className="flex flex-col h-full">
                    {/* Header/Hero Section */}
                    <div className="bg-primary p-12 text-primary-foreground relative overflow-hidden shrink-0">
                      <div className="absolute top-0 right-0 p-12 opacity-10 scale-[4] pointer-events-none select-none">
                        {selectedDest.image}
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl">{selectedDest.image}</span>
                          <Badge variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-md px-3 py-1 uppercase tracking-widest text-[10px] font-black">
                            {selectedDest.difficulty} Difficulty
                          </Badge>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight">{selectedDest.country}</h2>
                        <p className="text-primary-foreground/80 font-bold text-lg mt-1">{selectedDest.type}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-8 shrink-0">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> Processing Time
                        </p>
                        <p className="text-xl font-bold">{selectedDest.processingTime}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <DollarSign className="h-3 w-3" /> Visa Fee
                        </p>
                        <p className="text-xl font-bold">{selectedDest.fee}</p>
                      </div>
                    </div>

                    {/* Scrollable Requirements Section */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Comprehensive Requirements
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/5 text-primary border border-primary/10">
                            {selectedDest.requirements.length} Items
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {selectedDest.requirements.map((req, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              key={idx} 
                              className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-primary/30 hover:shadow-sm transition-all"
                            >
                              <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-primary font-bold text-sm shrink-0 border border-zinc-100 dark:border-zinc-700">
                                {idx + 1}
                              </div>
                              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-primary transition-colors">{req}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Pro Tip Placeholder for added "Elite" feel */}
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                          <Map className="h-12 w-12" />
                        </div>
                        <h5 className="text-xs font-black text-primary uppercase tracking-widest mb-2">Expert Advisor Tip</h5>
                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                          {selectedDest.country} requires thorough documentation. Ensure all bank statements are attested by your branch manager for a smoother approval process.
                        </p>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-8 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                      <Button className="w-full h-16 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20 hover:shadow-primary/30 transform active:scale-[0.98] transition-all">
                        Initiate Application Process
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground mt-4 font-bold uppercase tracking-widest">
                        Secure Submission Portal • 256-bit Encryption
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          {filteredDestinations.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-muted-foreground">
              <Map className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No destinations found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
