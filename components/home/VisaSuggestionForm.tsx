"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { ArrowRight, Sparkles, MapPin, Briefcase, Calendar, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

import { visaSuggestionSchema, type VisaSuggestionValues } from "@/lib/validations/forms";

type AISuggestion = {
  visaType: string;
  reason: string;
  documents: string[];
  processingTime: string;
  probability: 'High' | 'Medium' | 'Low';
};

export function VisaSuggestionForm() {
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<VisaSuggestionValues>({
    resolver: zodResolver(visaSuggestionSchema),
    defaultValues: {
      destination: "",
      duration: "",
    },
  });

  async function onSubmit(values: VisaSuggestionValues) {
    setIsAnalyzing(true);
    setSuggestion(null);
    setAiError(null);

    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get suggestion');
      setSuggestion(data);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <section id="suggestion" className="py-20 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Find Your Perfect Visa</h2>
          <p className="text-lg text-muted-foreground">
            Tell us about your travel plans, and our AI will recommend the most suitable visa type for your profile in seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle>Travel Details</CardTitle>
              <CardDescription>Fill in this quick form to get a recommendation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Destination Country</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Australia, Canada" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Purpose of Visit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select purpose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tourism">Tourism / Holiday</SelectItem>
                              <SelectItem value="work">Work / Employment</SelectItem>
                              <SelectItem value="study">Study / Education</SelectItem>
                              <SelectItem value="business">Business / Investment</SelectItem>
                              <SelectItem value="family">Family Visit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Intended Duration</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Months (e.g. 6)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Wallet className="w-4 h-4 text-primary" /> Estimated Budget (USD)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Under $2,000</SelectItem>
                              <SelectItem value="medium">$2,000 - $5,000</SelectItem>
                              <SelectItem value="high">$5,000 - $10,000</SelectItem>
                              <SelectItem value="premium">Above $10,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="animate-spin h-5 w-5" /> Analyzing Profile...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Get AI Recommendation <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isAnalyzing && !suggestion && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card border-2 border-dashed border-muted p-10 rounded-xl text-center flex flex-col items-center justify-center h-full min-h-[300px]"
                >
                  <Sparkles className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">Awaiting Your Details</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Submit the form to receive a personalized, AI-driven visa recommendation tailored specially for you.
                  </p>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card border p-10 rounded-xl text-center flex flex-col items-center justify-center h-full min-h-[300px]"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <Sparkles className="h-16 w-16 text-primary relative z-10 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2">
                    AI is crunching the numbers...
                  </h3>
                  <p className="text-muted-foreground">Cross-referencing global immigration policies and your profile.</p>
                </motion.div>
              )}

              {suggestion && !isAnalyzing && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary to-blue-600 text-white p-8 rounded-xl shadow-2xl h-full flex flex-col justify-center min-h-[300px]"
                >
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 backdrop-blur-md">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider text-white/80 mb-2">Highly Recommended Match</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{suggestion.visaType}</h3>
                  <p className="text-white/90 mb-8 text-lg">
                    Based on your profile, this visa offers the highest probability of approval and matches your intended duration perfectly.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button variant="secondary" className="w-full">View Requirements</Button>
                    <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                      Start Application
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
