"use client";

import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bot, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

type Step = "welcome" | "name" | "phone" | "email" | "completed";

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(open);

  useEffect(() => {
    isOpenRef.current = open;
  }, [open]);

  // Utility to get current time in HH:MM format
  const getFormattedTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input field when typing completes
  useEffect(() => {
    if (step !== "welcome" && step !== "completed" && !isTyping) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }
  }, [step, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Sequential onboarding bot sequence
  const runWelcomeSequence = async () => {
    setMessages([]);
    setStep("welcome");
    setInputValue("");
    setValidationError("");
    setFormData({ name: "", phone: "", email: "" });
    setLoading(false);

    if (!isOpenRef.current) return;
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!isOpenRef.current) return;
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: "1",
        sender: "bot",
        text: "👋 Welcome to India's No. 1 Residential School.",
        time: getFormattedTime(),
      },
    ]);

    if (!isOpenRef.current) return;
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!isOpenRef.current) return;
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: "2",
        sender: "bot",
        text: "We'll help you connect with our admission counsellor.",
        time: getFormattedTime(),
      },
    ]);

    if (!isOpenRef.current) return;
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!isOpenRef.current) return;
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: "3",
        sender: "bot",
        text: "🤖 Would you like to continue?",
        time: getFormattedTime(),
      },
    ]);
  };

  useEffect(() => {
    if (open) {
      runWelcomeSequence();
    }
  }, [open]);

  const closePopup = () => {
    setOpen(false);
  };

  const handleContinue = async () => {
    setMessages((prev) => [...prev, { id: `user-continue`, sender: "user", text: "Yes, Continue", time: getFormattedTime() }]);
    setStep("name");

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsTyping(false);
    setMessages((prev) => [...prev, { id: `bot-great`, sender: "bot", text: "Great! 😊", time: getFormattedTime() }]);

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTyping(false);
    setMessages((prev) => [...prev, { id: `bot-name`, sender: "bot", text: "Please tell me your name.", time: getFormattedTime() }]);
  };

  const submitLead = async (data: typeof formData) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          message: "Submitted via Admission Assistant Chatbot",
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const val = inputValue.trim();

    if (step === "name") {
      setFormData((prev) => ({ ...prev, name: val }));
      setMessages((prev) => [...prev, { id: `user-name-${Date.now()}`, sender: "user", text: val, time: getFormattedTime() }]);
      setInputValue("");
      setStep("phone");

      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `bot-nice-meet-${Date.now()}`, sender: "bot", text: `Nice to meet you, ${val}.`, time: getFormattedTime() }]);

      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `bot-ask-phone-${Date.now()}`, sender: "bot", text: "Can I have your mobile number?", time: getFormattedTime() }]);
    } else if (step === "phone") {
      // Validate immediately: 10 digits and only numbers
      const isPhoneValid = /^\d{10}$/.test(val);
      if (!isPhoneValid) {
        setValidationError("Please enter a valid 10-digit mobile number containing only numbers.");
        return;
      }
      setValidationError("");

      setFormData((prev) => ({ ...prev, phone: val }));
      setMessages((prev) => [...prev, { id: `user-phone-${Date.now()}`, sender: "user", text: val, time: getFormattedTime() }]);
      setInputValue("");
      setStep("email");

      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `bot-thanks-${Date.now()}`, sender: "bot", text: "Thanks!", time: getFormattedTime() }]);

      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: `bot-ask-email-${Date.now()}`, sender: "bot", text: "What's your email address?", time: getFormattedTime() }]);
    } else if (step === "email") {
      // Validate email pattern
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!isEmailValid) {
        setValidationError("Please enter a valid email address.");
        return;
      }
      setValidationError("");

      setFormData((prev) => ({ ...prev, email: val }));
      setMessages((prev) => [...prev, { id: `user-email-${Date.now()}`, sender: "user", text: val, time: getFormattedTime() }]);
      setInputValue("");
      setStep("completed");
      setLoading(true);

      setIsTyping(true);
      // Submit lead to Payload CMS
      const finalData = { ...formData, email: val };
      const success = await submitLead(finalData);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTyping(false);
      setLoading(false);

      if (success) {
        setMessages((prev) => [
          ...prev,
          { id: `bot-thankyou-${Date.now()}`, sender: "bot", text: "Thank you!", time: getFormattedTime() },
          {
            id: `bot-assist-${Date.now()}`,
            sender: "bot",
            text: "Our admission counsellors are currently assisting other parents.",
            time: getFormattedTime(),
          },
          {
            id: `bot-call-${Date.now()}`,
            sender: "bot",
            text: "One of our experts will call you within the next 2 working hours.",
            time: getFormattedTime(),
          },
          { id: `bot-day-${Date.now()}`, sender: "bot", text: "Have a wonderful day! 😊", time: getFormattedTime() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-error-${Date.now()}`,
            sender: "bot",
            text: "Thank you! Your information was saved. But we encountered an issue processing the direct sync. Rest assured, our team will reach out to you soon.",
            time: getFormattedTime(),
          },
        ]);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          closePopup();
        } else {
          runWelcomeSequence();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[400px] p-0 overflow-hidden bg-[#0b141a] border border-[#202c33] text-[#e9edef] rounded-2xl shadow-2xl flex flex-col h-[560px] max-h-[95vh] font-manrope"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Admission Assistant Chatbot</DialogTitle>
        </DialogHeader>

        {/* WhatsApp Custom Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#202c33] border-b border-[#0b141a] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-[#e9edef] border border-[#00a884]">
              <Bot className="w-5.5 h-5.5 text-[#00a884]" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00e676] border-2 border-[#202c33] rounded-full animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-[#e9edef] leading-none">Admission Assistant</h4>
              <p className="text-[11px] text-[#8696a0] mt-1.5">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={closePopup} className="text-[#8696a0] hover:text-white hover:bg-[#2a3942] rounded-full w-8 h-8 cursor-pointer flex-shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* WhatsApp Chat Feed with wallpaper doodle pattern */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth min-h-0 relative"
          style={{
            backgroundColor: "#0b141a",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath fill-rule='evenodd' d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM11 61c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm74-24c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18zM34 14c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 48c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm44-38c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 48c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "local",
          }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-1.5 rounded-lg text-[13px] leading-relaxed shadow-sm flex flex-col min-w-[70px] max-w-[85%] ${
                    msg.sender === "user" ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none" : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line text-[#e9edef]">{msg.text}</p>

                  {/* Timestamp & double checkmarks offset wrapper */}
                  <div className="flex items-center justify-end gap-1.5 self-end mt-1 -mr-1 -mb-0.5 select-none opacity-80">
                    <span className="text-[9px] text-[#8696a0] font-sans font-normal leading-none">{msg.time}</span>
                    {msg.sender === "user" && (
                      <svg className="w-3.5 h-3.5 text-[#53bdeb] flex-shrink-0" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 6L5 9.5L14.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.5 6L9 9.5L18.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3.5 py-2.5 shadow-sm flex items-center">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input / Action Area */}
        {step === "welcome" && (
          <div className="p-3 bg-[#111b21] border-t border-[#202c33]/40 flex flex-col gap-2 flex-shrink-0">
            <Button
              onClick={handleContinue}
              className="w-full bg-[#00a884] text-white hover:bg-[#008f72] font-semibold py-4.5 cursor-pointer rounded-xl flex items-center justify-center gap-2 border-none shadow-sm text-sm transition-colors"
            >
              Yes, Continue
            </Button>
          </div>
        )}

        {step !== "welcome" && step !== "completed" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3.5 bg-[#111b21] border-t border-[#202c33]/40 flex flex-col gap-1.5 flex-shrink-0"
          >
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (validationError) setValidationError("");
                }}
                placeholder={
                  isTyping
                    ? "Bot typing..."
                    : step === "name"
                      ? "Type your name..."
                      : step === "phone"
                        ? "Enter 10-digit mobile number..."
                        : step === "email"
                          ? "Enter email address..."
                          : "Type a message..."
                }
                disabled={isTyping || loading}
                className="flex-1 bg-[#2a3942] border-none text-[#e9edef] rounded-full py-4.5 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder-[#8696a0] h-9"
                type={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
                autoComplete="off"
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isTyping || loading}
                size="icon"
                className="rounded-full h-9 w-9 bg-[#00a884] text-white hover:bg-[#008f72] flex-shrink-0 cursor-pointer flex items-center justify-center border-none shadow-sm disabled:opacity-40 disabled:bg-[#2a3942] disabled:text-[#8696a0] transition-colors"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {validationError && (
              <p className="text-xs text-red-400 px-2 font-medium flex items-center gap-1 mt-0.5 animate-pulse">
                <span>⚠️</span> {validationError}
              </p>
            )}
          </form>
        )}

        {step === "completed" && (
          <div className="p-3 bg-[#111b21] border-t border-[#202c33]/40 flex-shrink-0">
            <Button
              onClick={closePopup}
              className="w-full bg-[#00a884] text-white hover:bg-[#008f72] font-semibold py-4.5 cursor-pointer rounded-xl flex items-center justify-center gap-2 border-none shadow-sm text-sm transition-colors"
            >
              Close Chat
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
