"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const eligibilitySchema = z.object({
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 18, {
    message: "You must be at least 18 years old.",
  }),
  employment: z.string().min(1, { message: "Please select your employment status." }),
  savings: z.string().min(1, { message: "Please select your savings range." }),
  travelHistory: z.string().min(1, { message: "Please select your travel history." }),
});

export function EligibilityScore() {
  const [score, setScore] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<z.infer<typeof eligibilitySchema>>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      age: "",
      employment: "",
      savings: "",
      travelHistory: "",
    },
  });

  function onSubmit(values: z.infer<typeof eligibilitySchema>) {
    setIsCalculating(true);
    
    // Simulate complex calculation
    setTimeout(() => {
      let calcScore = 30; // Base score
      
      // Age logic
      const ageNum = parseInt(values.age);
      if (ageNum > 25 && ageNum < 45) calcScore += 15;
      else if (ageNum >= 18) calcScore += 10;
      
      // Employment logic
      if (values.employment === "ft") calcScore += 25;
      else if (values.employment === "se") calcScore += 20;
      else if (values.employment === "pt") calcScore += 10;
      
      // Savings logic
      if (values.savings === "high") calcScore += 20;
      else if (values.savings === "med") calcScore += 15;
      else if (values.savings === "low") calcScore += 5;
      
      // Travel History
      if (values.travelHistory === "frequent") calcScore += 10;
      else if (values.travelHistory === "some") calcScore += 5;

      setScore(Math.min(calcScore, 100)); // Cap at 100
      setIsCalculated(true);
      setIsCalculating(false);
    }, 1200);
  }

  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreGradient = () => {
    if (score >= 80) return "from-green-500 to-emerald-400";
    if (score >= 50) return "from-yellow-500 to-orange-400";
    return "from-red-500 to-rose-400";
  };

  return (
    <section id="score" className="py-20 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Check Your Eligibility</h2>
          <p className="text-lg text-muted-foreground">
            Our AI algorithm calculates your visa approval probability based on historical data and global policy trends.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Form Section */}
          <Card className="lg:col-span-7 border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle>Profile Assessment</CardTitle>
              <CardDescription>All information remains strictly confidential.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 28" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ft">Full-time Employed</SelectItem>
                              <SelectItem value="se">Self-employed / Business</SelectItem>
                              <SelectItem value="pt">Part-time / Freelance</SelectItem>
                              <SelectItem value="st">Student</SelectItem>
                              <SelectItem value="un">Unemployed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="savings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Savings / Funds Available</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Under $5,000</SelectItem>
                              <SelectItem value="med">$5,000 - $15,000</SelectItem>
                              <SelectItem value="high">Above $15,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="travelHistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Past Travel History</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select history" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No international travel</SelectItem>
                              <SelectItem value="some">Traveled to 1-3 countries</SelectItem>
                              <SelectItem value="frequent">Traveled to 4+ countries</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full mt-6 h-12" disabled={isCalculating}>
                    {isCalculating ? "Calculating..." : "Calculate My Score"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="lg:col-span-5 bg-card flex flex-col justify-center border-primary/20 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"></div>
            <CardContent className="p-8 relative z-10 flex flex-col items-center justify-center h-full text-center">
              {!isCalculated && !isCalculating ? (
                <>
                  <Info className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Awaiting Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete the form to see your estimated approval chances and recommendations.
                  </p>
                </>
              ) : (
                <div className="w-full flex-col items-center flex">
                  <h3 className="text-lg font-bold text-muted-foreground mb-6 uppercase tracking-widest">Your Score</h3>
                  
                  {/* Circle Meter */}
                  <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96" cy="96" r="88"
                        className="stroke-muted/30" strokeWidth="12" fill="none"
                      />
                      <motion.circle
                        cx="96" cy="96" r="88"
                        className={`stroke-current ${getScoreColor()}`}
                        strokeWidth="12" fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: 553, strokeDashoffset: 553 }}
                        animate={{ strokeDashoffset: isCalculated ? 553 - (553 * score) / 100 : 553 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span 
                        className={`text-6xl font-black ${getScoreColor()}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        {isCalculated ? score : 0}
                      </motion.span>
                      <span className="text-sm text-muted-foreground font-medium">/ 100</span>
                    </div>
                  </div>

                  {isCalculated && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      {score >= 80 ? (
                        <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-xl border border-green-500/20 flex items-start gap-3 text-left">
                          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium">Excellent chances! Gather your documents and apply with confidence.</p>
                        </div>
                      ) : score >= 50 ? (
                        <div className="bg-yellow-500/10 text-yellow-600 px-4 py-3 rounded-xl border border-yellow-500/20 flex items-start gap-3 text-left">
                          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium">Moderate chances. Improve your profile by securing more funds or travel history.</p>
                        </div>
                      ) : (
                        <div className="bg-red-500/10 text-red-600 px-4 py-3 rounded-xl border border-red-500/20 flex items-start gap-3 text-left">
                          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium">Low chances. We highly recommend consulting with an expert before applying.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
