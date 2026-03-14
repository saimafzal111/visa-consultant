"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Clock, DollarSign, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
                <Card className={`overflow-hidden transition-all duration-300 ${expandedId === dest.id ? 'ring-2 ring-primary shadow-xl' : 'hover:border-primary/50 hover:shadow-md'}`}>
                  <CardContent className="p-0">
                    <div className="p-6 cursor-pointer" onClick={() => setExpandedId(expandedId === dest.id ? null : dest.id)}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{dest.image}</span>
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
                      
                      <div className="mt-4 flex justify-center text-muted-foreground/50">
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedId === dest.id ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === dest.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-muted/30 border-t"
                        >
                          <div className="p-6">
                            <h4 className="font-semibold flex items-center gap-2 mb-3 text-sm">
                              <FileText className="h-4 w-4 text-primary" /> Key Requirements
                            </h4>
                            <ul className="space-y-2">
                              {dest.requirements.map((req, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                            
                            <Button className="w-full mt-6 rounded-lg text-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-none">
                              Start Application for {dest.country}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
