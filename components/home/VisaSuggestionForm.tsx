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
      purpose: "",
      duration: "",
      budget: "",
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
    <section id="suggestion" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Find Your Perfect Visa</h2>
          <p className="text-lg text-muted-foreground/80 font-medium">
            AI-driven recommendations tailored to your unique travel profile.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <Card className="shadow-2xl shadow-zinc-200/50 dark:shadow-none border-zinc-200/60 dark:border-zinc-800 h-full flex flex-col rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Travel Details</CardTitle>
              <CardDescription className="text-xs font-medium">Input your trip parameters below.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pt-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Destination</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Canada" className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-transparent focus:border-primary/20 transition-all" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Purpose</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-11 w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 border-transparent focus:border-primary/20 transition-all">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="tourism">Tourism</SelectItem>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="study">Study</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="family">Family</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Months</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Duration" className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-transparent focus:border-primary/20 transition-all" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Budget (USD)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="h-11 w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 border-transparent focus:border-primary/20 transition-all">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="low">Under $2,000</SelectItem>
                              <SelectItem value="medium">$2,000 - $5,000</SelectItem>
                              <SelectItem value="high">$5,000 - $10,000</SelectItem>
                              <SelectItem value="premium">Above $10,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-sm font-bold rounded-xl mt-6 shadow-xl shadow-primary/10 transition-transform active:scale-95" disabled={isAnalyzing}>
                    {isAnalyzing ? "Analyzing..." : "Get Recommendation"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="h-full flex flex-col justify-stretch relative">
            <AnimatePresence>
              {!isAnalyzing && !suggestion && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, position: "absolute" }}
                  transition={{ duration: 0.3 }}
                  className="w-full bg-card border-2 border-dashed border-muted p-10 rounded-xl text-center flex flex-col items-center justify-center h-full"
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
                  exit={{ opacity: 0, scale: 0.95, position: "absolute" }}
                  transition={{ duration: 0.3 }}
                  className="w-full bg-card border p-10 rounded-xl text-center flex flex-col items-center justify-center h-full"
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
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10, position: "absolute" }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden h-full flex flex-col"
                >
                  <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${suggestion.probability === 'High' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          suggestion.probability === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-red-50 text-red-600 border-red-100'
                        }`}>
                        {suggestion.probability} Confidence
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 block">Best Match</span>
                    <h3 className="text-2xl font-black text-foreground">{suggestion.visaType}</h3>
                  </div>

                  <div className="p-8 flex-1 space-y-8 overflow-y-auto">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-primary flex items-center gap-2">
                        Recommendation logic
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                        {suggestion.reason}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Timeline</h4>
                        <p className="text-lg font-black">{suggestion.processingTime}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Requirements</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {suggestion.documents.slice(0, 3).map((doc, i) => (
                            <span key={i} className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800 capitalize">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 mt-auto">
                    <Button className="w-full h-12 text-sm font-black rounded-xl shadow-lg shadow-primary/20 transition-transform active:scale-95">
                      Apply Now
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
