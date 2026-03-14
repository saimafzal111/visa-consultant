"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Clock, DollarSign, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

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

          {/* Detailed Dialog */}
          <Dialog open={!!selectedDest} onOpenChange={(open) => !open && setSelectedDest(null)}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-none">
              {selectedDest && (
                <div className="flex flex-col">
                  {/* Dialog Header/Hero */}
                  <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 scale-[3] pointer-events-none">
                      {selectedDest.image}
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{selectedDest.image}</span>
                        <Badge variant="outline" className="text-white border-white/20 bg-white/10">
                          {selectedDest.difficulty} Difficulty
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-black">{selectedDest.country}</h2>
                      <p className="text-primary-foreground/80 font-medium">{selectedDest.type}</p>
                    </div>
                  </div>

                  <div className="p-8 space-y-8 bg-white dark:bg-zinc-950">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Processing Time</p>
                        <p className="font-bold flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" /> {selectedDest.processingTime}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visa Fee</p>
                        <p className="font-bold flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" /> {selectedDest.fee}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Required Documents
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedDest.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                            <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                            <span className="text-sm font-medium">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full h-14 rounded-xl text-md font-black shadow-xl shadow-primary/20 transition-transform active:scale-95">
                      Apply for {selectedDest.country} Visa
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          
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
