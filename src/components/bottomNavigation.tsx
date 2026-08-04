"use client";

import { useState } from "react";
import { Phone, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import { FaInstagram, FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "./ui/button";

export default function BottomNavigation() {
  const [compact, setCompact] = useState(false);
  return (
    <>
      <motion.div className="hidden fixed bottom-0 z-50 w-full md:hidden bg-gray-700 text-white backdrop-blur-md" animate={{ y: 0 }}>
        <motion.div
          className="mx-auto my-3 flex justify-around "
          animate={{
            maxWidth: compact ? "85%" : "100%",
            paddingTop: compact ? 4 : 7,
            paddingBottom: compact ? 4 : 7,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Link href="tel:+91-9557291888" className="flex items-center justify-center gap-2 px-3">
            <Phone size={20} />
            <motion.span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">Call Us</motion.span>
          </Link>

          <Link href="https://www.instagram.com/ecole_girls_school" className="flex items-center justify-center gap-2 px-3" target="_blank">
            <FaInstagram size={20} />
            <motion.span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">Instagram</motion.span>
          </Link>

          <Link href="#enquire-now" className="flex items-center justify-center gap-2 px-3">
            <CalendarPlus size={20} />
            <motion.span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">Enquire Now</motion.span>
          </Link>
        </motion.div>
      </motion.div>

      <div className="fixed bottom-0 z-50 w-full md:hidden bg-gray-700 text-white backdrop-blur-md flex gap-4 py-3 px-3">
        <Button
          asChild
          className="w-1/2 h-auto py-2 bg-white hover:bg-white text-black hover:text-black border-0 rounded-none cursor-pointer [clip-path:polygon(0_11px,8px_0,100%_0,100%_calc(100%-11px),calc(100%-8px)_100%,0_100%)]"
        >
          <Link href="tel:+91-9557291888" className="flex items-center justify-center gap-2">
            <Phone size={20} />
            <span className="overflow-hidden whitespace-nowrap font-medium">Call Us</span>
          </Link>
        </Button>

        <div className="w-1/2 bg-white p-px [clip-path:polygon(0_11px,8px_0,100%_0,100%_calc(100%-11px),calc(100%-8px)_100%,0_100%)]">
          <Button
            asChild
            className="w-full h-full py-2 bg-gray-700 hover:bg-gray-700 text-white hover:text-white border-0 rounded-none cursor-pointer [clip-path:polygon(0_11px,8px_0,100%_0,100%_calc(100%-11px),calc(100%-8px)_100%,0_100%)]"
          >
            <Link href="#enquire-now" className="flex items-center justify-center gap-2">
              <CalendarPlus size={20} />
              <span className="overflow-hidden whitespace-nowrap font-medium">Enquire Now</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
