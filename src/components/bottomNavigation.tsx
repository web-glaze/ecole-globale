"use client";

import { useState } from "react";
import { Phone, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import { FaInstagram, FaPhone } from "react-icons/fa6";
import Link from "next/link";

export default function BottomNavigation() {
  const [compact, setCompact] = useState(false);
  return (
    <>
      <motion.div
        className="fixed bottom-0 z-50 w-full md:hidden bg-gray-700 text-white backdrop-blur-md"
        animate={{
          y: 0,
        }}
      >
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
            <Phone size={18} />

            {/* <AnimatePresence>{!compact && */}
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">Call Us</motion.span>
            {/* } </AnimatePresence> */}
          </Link>

          <Link href="https://www.instagram.com/ecole_girls_school" className="flex items-center justify-center gap-2 px-3" target="_blank">
            <FaInstagram size={18} />

            {/* <AnimatePresence>{!compact && */}
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">Instagram</motion.span>
            {/* } </AnimatePresence> */}
          </Link>

          <Link href="#enquire-now" className="flex items-center justify-center gap-2 px-3">
            <CalendarPlus size={18} />

            {/* <AnimatePresence>{!compact &&  */}
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">Enquire Now</motion.span>
            {/* } </AnimatePresence> */}
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
