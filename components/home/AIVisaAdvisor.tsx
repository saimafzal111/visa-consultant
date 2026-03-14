"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Bot, User, Sparkles, X, CheckCheck, Copy, Check, Clock, FileText, Banknote, ListChecks, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
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
    content: "💡 **Strategic Summary**: I am your Elite AI Visa Consultant. I'm connected to the latest immigration databases to provide you with a high-end, proactive consultancy experience. \n\nHow can I strategically assist your travel plans today?",
  },
];

const QUICK_ACTIONS = [
  { label: "📄 Requirements", query: "What are the core requirements?" },
  { label: "💰 Cost Details", query: "Calculate my total visa fees" },
  { label: "🕒 Timeline", query: "What is the fastest processing time?" },
  { label: "🚩 Expert Advice", query: "What are the common mistakes to avoid?" },
];

const THINKING_STATUSES = [
  "Consulting latest regulations...",
  "Reviewing embassy guidelines...",
  "Analyzing eligibility patterns...",
  "Compiling expert documentation...",
];

export function AIVisaAdvisor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStatus, setThinkingStatus] = useState(THINKING_STATUSES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isTyping) {
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % THINKING_STATUSES.length;
        setThinkingStatus(THINKING_STATUSES[i]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || input;
    if (!query.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!customQuery) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response');

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.reply
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I'm sorry, I'm having trouble connecting to the elite consultancy network. Please try again later."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
            <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/80 p-5 flex items-center justify-between text-primary-foreground shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 opacity-10">
                <Sparkles className="h-20 w-20 rotate-12" />
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight leading-none mb-1">VisaBot Elite</h3>
                  <div className="flex items-center gap-1.5 opacity-90">
                    <CheckCheck className="h-3 w-3" />
                    <p className="text-[10px] uppercase font-bold tracking-widest">Global AI Consultant</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-white/20 rounded-full h-9 w-9">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50">
              {messages.map((msg, index) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1.5`}>
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-1.5 ml-1 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Sparkles className="h-2.5 w-2.5" />
                        Professional Analysis
                      </span>
                    </div>
                  )}
                  <div className={`relative max-w-[90%] rounded-2xl px-5 py-4 text-[13px] transition-all duration-300 group ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-xl border-l-4 border-white/20" 
                      : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-bl-none text-foreground shadow-sm hover:shadow-lg border-l-4 border-primary/40"
                  }`}>
                    {msg.role === "ai" ? (
                      <>
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:mb-3 prose-headings:mt-5 first:prose-headings:mt-0">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-4 last:mb-0 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc ml-5 mb-4 space-y-2 text-zinc-700 dark:text-zinc-300 border-l-2 border-primary/10 pl-3">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal ml-5 mb-4 space-y-2 text-zinc-700 dark:text-zinc-300 border-l-2 border-primary/10 pl-3">{children}</ol>,
                              li: ({ children }) => <li className="pl-1 decoration-primary/30">{children}</li>,
                              h3: ({ children }) => <h3 className="text-zinc-900 dark:text-white text-base font-extrabold mb-3 mt-5 flex items-center gap-2 border-b border-primary/10 pb-1">{children}</h3>,
                              strong: ({ children }) => <strong className="font-extrabold text-primary dark:text-primary bg-primary/5 px-1 rounded-sm underline decoration-primary/20 underline-offset-4">{children}</strong>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="absolute -top-3 -right-3 p-2 rounded-full text-zinc-400 hover:text-primary hover:bg-white dark:hover:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-all border border-zinc-100 dark:border-zinc-800 shadow-lg bg-white dark:bg-zinc-900"
                          title="Copy Consultancy Report"
                        >
                          {copiedId === msg.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </>
                    ) : (
                      <div className="whitespace-pre-wrap font-semibold tracking-tight">{msg.content}</div>
                    )}
                  </div>
                  
                  {/* Quick Actions after AI Message */}
                  {msg.role === "ai" && index === messages.length - 1 && !isTyping && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => handleSubmit(undefined, action.query)}
                          className="text-[11px] font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl hover:border-primary hover:text-primary hover:shadow-md transition-all flex items-center gap-1.5 group"
                        >
                          {action.label}
                          <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="text-[10px] font-extrabold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      Legal Processing
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-primary/10 rounded-2xl rounded-bl-none px-6 py-5 text-[11px] flex flex-col gap-3 shadow-xl max-w-[85%] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <motion.div className="w-2.5 h-2.5 bg-primary rounded-full" animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <motion.div className="absolute top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full" animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      </div>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 tracking-wide">
                        {thinkingStatus}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-primary/60 to-primary h-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                        initial={{ width: "0%" }} 
                        animate={{ width: "95%" }} 
                        transition={{ duration: 6, ease: "easeInOut" }} 
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
              <div className="relative flex items-center group">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Need elite advice? Type your visa query..."
                  className="pr-14 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary focus-visible:ring-offset-0 placeholder:text-zinc-400 text-sm font-medium transition-all group-focus-within:bg-white dark:group-focus-within:bg-zinc-800 group-focus-within:shadow-inner"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1.5 rounded-xl h-9 w-9 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 bg-primary group-hover:shadow-primary/30" 
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4.5 w-4.5" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3">
                <p className="text-[9px] uppercase font-extrabold text-zinc-400 tracking-tighter flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  Live Regulations Database Active
                </p>
                <div className="h-1 w-1 bg-zinc-300 rounded-full" />
                <p className="text-[9px] uppercase font-extrabold text-zinc-400 tracking-tighter">
                  End-to-End Encryption
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
