"use client";

import { useState } from "react";
import { Phone, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import { FaInstagram, FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const phoneNumber = pathname === "/vacancies" ? "tel:+91-7217017047" : "tel:+91-9557291888";
  const formLink = pathname === "/vacancies" ? "mailto:hr@ecoleglobale.com" : "#enquire-now";

  return (
    <>
      <motion.div
        className="fixed bottom-0 z-50 w-full md:hidden bg-white backdrop-blur-md border-t"
        animate={{
          y: 0,
        }}
      >
        <motion.div
          className="mx-auto my-3 flex items-center justify-center gap-0"
          animate={{
            maxWidth: compact ? "85%" : "100%",
            paddingTop: compact ? 4 : 6,
            paddingBottom: compact ? 4 : 6,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {/* Call Us Button */}
          <Link href={phoneNumber} className="flex flex-1 items-center justify-center gap-2 px-3 py-1">
            <Phone size={22} />
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">Call Us</motion.span>
          </Link>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-gray-300" />

          {/* Enquire Now Button */}
          <Link href={formLink} className="flex flex-1 items-center justify-center gap-2 px-3 py-1">
            <CalendarPlus size={22} />
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">Enquire Now</motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
