"use client";

import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bot, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

type Step = "welcome" | "name" | "phone" | "email" | "completed";

interface FormData {
  name: string;
  phone: string;
  email: string;
}

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const hasShownExitPopup = useRef(false);
  const hasShownTimerPopup = useRef(false);
  const hasInitialized = useRef(false);

  const leadSubmittedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(open);
  const pathname = usePathname();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    isOpenRef.current = open;
  }, [open]);

  const getFormattedTime = () => {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const validateName = (value: string): string => {
    const name = value.trim();

    if (!name) {
      return "Please enter your name.";
    }

    if (name.length < 2) {
      return "Name must be at least 2 characters.";
    }

    if (name.length > 100) {
      return "Name must not exceed 100 characters.";
    }

    return "";
  };

  const validatePhone = (value: string): string => {
    const phone = value.trim();
    if (!phone) {
      return "Please enter your phone number.";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return "Please enter a valid phone number.";
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    const email = value.trim();
    if (!email) {
      return "Please enter your email address.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (email.length > 150) {
      return "Email must not exceed 150 characters.";
    }
    return "";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (step !== "welcome" && step !== "completed" && !isTyping && open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [step, isTyping, open]);

  useEffect(() => {
    if (leadSubmitted) return;

    const timer = setTimeout(() => {
      if (!leadSubmitted && !hasShownExitPopup.current && !hasShownTimerPopup.current) {
        hasShownTimerPopup.current = true;
        setOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [leadSubmitted]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();

    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  useEffect(() => {
    if (leadSubmitted || !isDesktop) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null && !isOpenRef.current && !leadSubmitted && !hasShownExitPopup.current) {
        hasShownExitPopup.current = true;
        hasShownTimerPopup.current = true;

        setOpen(true);
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [leadSubmitted, isDesktop]);

  const runWelcomeSequence = async () => {
    setMessages([]);
    setStep("welcome");
    setInputValue("");
    setValidationError("");
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
    setLoading(false);

    if (!isOpenRef.current) return;

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!isOpenRef.current) return;
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: "welcome-1",
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
        id: "welcome-2",
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
        id: "welcome-3",
        sender: "bot",
        text: "🤖 Would you like to continue?",
        time: getFormattedTime(),
      },
    ]);
  };

  useEffect(() => {
    if (open && !hasInitialized.current) {
      hasInitialized.current = true;
      runWelcomeSequence();
    }
  }, [open]);

  const submitLead = async (data: FormData, isPartial = false) => {
    if (!data.name && !data.phone) {
      return false;
    }
    if (leadSubmittedRef.current) {
      return true;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          message: isPartial ? "Partial enquiry submitted via Admission Assistant Chatbot" : "Submitted via Admission Assistant Chatbot",
          source: "Admission Assistant Chatbot",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (res.ok) {
        leadSubmittedRef.current = true;
        setLeadSubmitted(true);
      }

      return res.ok;
    } catch (error) {
      console.error("Lead submission failed:", error);
      return false;
    }
  };

  const closePopup = async () => {
    if (leadSubmittedRef.current || leadSubmitted) {
      setOpen(false);
      return;
    }

    let dataToSubmit: FormData = {
      ...formData,
    };

    const currentValue = inputValue.trim();
    if (currentValue) {
      if (step === "name") {
        const error = validateName(currentValue);

        if (!error) {
          dataToSubmit.name = currentValue;
        }
      }
      if (step === "phone") {
        const error = validatePhone(currentValue);
        if (!error) {
          dataToSubmit.phone = currentValue;
        }
      }
      if (step === "email") {
        const error = validateEmail(currentValue);
        if (!error) {
          dataToSubmit.email = currentValue;
        }
      }
    }
    if (dataToSubmit.name && dataToSubmit.phone) {
      await submitLead(dataToSubmit, true);
    }
    setOpen(false);
  };

  const handleContinue = async () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-continue-${Date.now()}`,
        sender: "user",
        text: "Yes, Continue",
        time: getFormattedTime(),
      },
    ]);

    setStep("name");
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!isOpenRef.current) return;
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-great-${Date.now()}`,
        sender: "bot",
        text: "Great! 😊",
        time: getFormattedTime(),
      },
    ]);

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!isOpenRef.current) return;
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-name-${Date.now()}`,
        sender: "bot",
        text: "Please tell me your name.",
        time: getFormattedTime(),
      },
    ]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const val = inputValue.trim();
    setValidationError("");

    if (step === "name") {
      const error = validateName(val);

      if (error) {
        setValidationError(error);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        name: val,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `user-name-${Date.now()}`,
          sender: "user",
          text: val,
          time: getFormattedTime(),
        },
      ]);

      setInputValue("");
      setStep("phone");
      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (!isOpenRef.current) return;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-nice-meet-${Date.now()}`,
          sender: "bot",
          text: `Nice to meet you, ${val}.`,
          time: getFormattedTime(),
        },
      ]);

      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (!isOpenRef.current) return;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-ask-phone-${Date.now()}`,
          sender: "bot",
          text: "Can I have your mobile number?",
          time: getFormattedTime(),
        },
      ]);
      return;
    }

    if (step === "phone") {
      const error = validatePhone(val);

      if (error) {
        setValidationError(error);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        phone: val,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `user-phone-${Date.now()}`,
          sender: "user",
          text: val,
          time: getFormattedTime(),
        },
      ]);

      setInputValue("");
      setStep("email");
      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (!isOpenRef.current) return;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-thanks-${Date.now()}`,
          sender: "bot",
          text: "Thanks!",
          time: getFormattedTime(),
        },
      ]);

      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (!isOpenRef.current) return;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-ask-email-${Date.now()}`,
          sender: "bot",
          text: "What's your email address?",
          time: getFormattedTime(),
        },
      ]);

      return;
    }

    if (step === "email") {
      const error = validateEmail(val);
      if (error) {
        setValidationError(error);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        email: val,
      }));
      setMessages((prev) => [
        ...prev,
        {
          id: `user-email-${Date.now()}`,
          sender: "user",
          text: val,
          time: getFormattedTime(),
        },
      ]);

      setInputValue("");
      setStep("completed");
      setLoading(true);
      setIsTyping(true);
      const finalData: FormData = {
        ...formData,
        email: val,
      };

      const success = await submitLead(finalData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTyping(false);
      setLoading(false);
      if (success) {
        hasShownExitPopup.current = true;
        hasShownTimerPopup.current = true;
        hasInitialized.current = false;
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-thankyou-${Date.now()}`,
            sender: "bot",
            text: "Thank you!",
            time: getFormattedTime(),
          },
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
          {
            id: `bot-day-${Date.now()}`,
            sender: "bot",
            text: "Have a wonderful day! 😊",
            time: getFormattedTime(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-error-${Date.now()}`,
            sender: "bot",
            text: "We couldn't process your enquiry right now. Please try again.",
            time: getFormattedTime(),
          },
        ]);
      }
    }
  };

  if (pathname === "/vacancies") {
    return null;
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          closePopup();
        } else {
          setOpen(true);
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

        {/* WhatsApp Header */}

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

        <div
          className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth min-h-0 relative"
          style={{
            backgroundColor: "#0b141a",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath fill-rule='evenodd' d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM11 61c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm74-24c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18zM34 14c0 4.418-3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm-8 48c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm44-38c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8zm-8 48c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: "local",
          }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-1.5 rounded-lg text-[13px] leading-relaxed shadow-sm flex flex-col min-w-[70px] max-w-[85%] ${
                    msg.sender === "user" ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none" : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line text-[#e9edef]">{msg.text}</p>

                  {/* Timestamp */}

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

            {/* Typing */}

            {isTyping && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="flex justify-start"
              >
                <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3.5 py-2.5 shadow-sm flex items-center">
                  <div className="flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce"
                      style={{
                        animationDelay: "0ms",
                      }}
                    />

                    <span
                      className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce"
                      style={{
                        animationDelay: "150ms",
                      }}
                    />

                    <span
                      className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce"
                      style={{
                        animationDelay: "300ms",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

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
                  let value = e.target.value;

                  // Name
                  if (step === "name") {
                    value = value.slice(0, 100);
                  }

                  // Phone
                  if (step === "phone") {
                    value = value.slice(0, 20);
                  }

                  // Email
                  if (step === "email") {
                    value = value.slice(0, 150);
                  }

                  setInputValue(value);

                  if (validationError) {
                    setValidationError("");
                  }
                }}
                placeholder={
                  isTyping
                    ? "Bot typing..."
                    : step === "name"
                      ? "Type your name..."
                      : step === "phone"
                        ? "Enter phone number..."
                        : step === "email"
                          ? "Enter email address..."
                          : "Type a message..."
                }
                disabled={isTyping || loading}
                className="flex-1 bg-[#2a3942] border-none text-[#e9edef] rounded-full py-4.5 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder-[#8696a0] h-9"
                type={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
                inputMode={step === "phone" ? "tel" : step === "email" ? "email" : "text"}
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
              <p className="text-xs text-red-400 px-2 font-medium flex items-center gap-1 mt-0.5">
                <span>⚠️</span>
                {validationError}
              </p>
            )}
          </form>
        )}

        {step === "completed" && (
          <div className="p-3 bg-[#111b21] border-t border-[#202c33]/40 flex-shrink-0">
            <Button
              onClick={closePopup}
              disabled={loading}
              className="w-full bg-[#00a884] text-white hover:bg-[#008f72] font-semibold py-4.5 cursor-pointer rounded-xl flex items-center justify-center gap-2 border-none shadow-sm text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Close Chat"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
