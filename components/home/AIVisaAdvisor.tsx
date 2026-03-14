"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Bot, User, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Hi there! I'm your AI Visa Advisor. I can help answer questions about documents, eligibility, or processing times. What would you like to know?",
  },
];

export function AIVisaAdvisor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      const aiResponses = [
        "In most cases, you will need a valid passport, proof of financial means, and a completed application form.",
        "Processing times vary by country. For example, a US B1/B2 visa can take weeks to months depending on interview availability.",
        "Your eligibility score looks good! I recommend gathering your employment references to strengthen your case.",
        "For student visas, an acceptance letter from a recognized educational institution is strictly mandatory.",
      ];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)]
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className={`fixed bottom-6 right-6 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-primary/90 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border bg-background"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-bold text-sm">AI Visa Advisor</h3>
                  <p className="text-xs opacity-80">Online | Ready to help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full h-8 w-8">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card border rounded-bl-none text-foreground shadow-sm"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-card border rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-primary/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-primary/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-primary/50 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-background border-t">
              <div className="relative flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about required documents..."
                  className="pr-12 rounded-full bg-zinc-100 dark:bg-zinc-900 border-none focus-visible:ring-1"
                />
                <Button type="submit" size="icon" className="absolute right-1 rounded-full h-8 w-8 hover:bg-primary shadow-none" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
