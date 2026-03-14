"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Bot, Sparkles, X, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Hi! I'm your **Visa Advisor**. I can help you understand visa requirements, fees, and processing times. \n\nWhat can I help you with today?",
  },
];

const QUICK_ACTIONS = [
  { label: "📄 Requirements", query: "What are the common travel visa requirements?" },
  { label: "💰 Cost", query: "What are the typical visa fees?" },
  { label: "🕒 Timeline", query: "How long does visa processing usually take?" },
  { label: "✅ Eligibility", query: "How is visa eligibility determined?" },
];

export function AIVisaAdvisor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

      if (!res.ok) {
        throw new Error('Failed to connect to advisor.');
      }

      const data = await res.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.reply || "I couldn't generate a response. Please try again."
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again soon."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary/90 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
        >
          <Sparkles className="h-6 w-6" />
        </motion.button>
      )}

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
            <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Visa Advisor</h3>
                  <div className="flex items-center gap-1 opacity-80">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-[10px] uppercase font-medium tracking-wider">Online</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)} 
                className="text-primary-foreground hover:bg-white/20 rounded-full h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50">
              {messages.map((msg, index) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1`}>
                  <div className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm transition-all duration-200 group ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-sm" 
                      : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-bl-none text-foreground shadow-sm"
                  }`}>
                    {msg.role === "ai" ? (
                      <>
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-3 last:mb-0 text-zinc-700 dark:text-zinc-300">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc ml-5 mb-3 space-y-1 text-zinc-700 dark:text-zinc-300">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 space-y-1 text-zinc-700 dark:text-zinc-300">{children}</ol>,
                              li: ({ children }) => <li className="pl-1">{children}</li>,
                              h3: ({ children }) => <h3 className="text-zinc-900 dark:text-white text-base font-bold mb-2 mt-4">{children}</h3>,
                              strong: ({ children }) => <strong className="font-semibold text-zinc-900 dark:text-white">{children}</strong>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full text-zinc-400 hover:text-primary hover:bg-white opacity-0 group-hover:opacity-100 transition-all border border-zinc-100 shadow-sm bg-white"
                        >
                          {copiedId === msg.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </>
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  {msg.role === "ai" && index === messages.length - 1 && !isTyping && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => handleSubmit(undefined, action.query)}
                          className="text-[11px] font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all shadow-sm"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 px-3 py-2 rounded-2xl rounded-bl-none text-xs text-zinc-400 font-medium">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
              <div className="relative flex items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a visa question..."
                  className="pr-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary h-11"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1 w-9 h-9 rounded-lg" 
                  disabled={!input.trim() || isTyping}
                >
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
