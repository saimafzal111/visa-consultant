import * as z from "zod";

export const eligibilitySchema = z.object({
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 18, {
    message: "You must be at least 18 years old.",
  }),
  employment: z.string().min(1, { message: "Please select your employment status." }),
  savings: z.string().min(1, { message: "Please select your savings range." }),
  travelHistory: z.string().min(1, { message: "Please select your travel history." }),
});

export type EligibilityValues = z.infer<typeof eligibilitySchema>;

export const visaSuggestionSchema = z.object({
  destination: z.string().min(2, "Destination country is required."),
  purpose: z.string().min(1, "Purpose of visit is required."),
  duration: z.string().min(1, "Intended duration is required."),
  budget: z.string().min(1, "Budget is required."),
});

export type VisaSuggestionValues = z.infer<typeof visaSuggestionSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactValues = z.infer<typeof contactSchema>;
