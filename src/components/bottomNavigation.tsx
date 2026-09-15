"use client";

import { useState } from "react";
import { Phone, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import { FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const phoneNumber = pathname === "/vacancies" ? "tel:+91-7217017047" : "tel:+91-9557291888";
  const whatsAppNumber = pathname === "/vacancies" ? "https://wa.me/917217017047" : "https://wa.me/919557291888";
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
          <Link href={formLink} className="flex flex-1 items-center justify-center gap-2 px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
              <g clip-path="url(#clip0_10020_7419)">
                <path
                  d="M14.7162 10.5022C13.7366 10.5022 12.7747 10.349 11.8633 10.0478C11.4167 9.89542 10.8676 10.0352 10.595 10.3151L8.796 11.6732C6.70963 10.5595 5.42446 9.27475 4.32596 7.20404L5.64408 5.45188C5.98654 5.10988 6.10938 4.61029 5.96221 4.14154C5.65971 3.22529 5.50604 2.26392 5.50604 1.28392C5.50608 0.575958 4.93013 0 4.22221 0H1.28387C0.575958 0 0 0.575958 0 1.28387C0 9.39846 6.60158 16 14.7162 16C15.4241 16 16 15.424 16 14.7161V11.786C16 11.0781 15.424 10.5022 14.7162 10.5022Z"
                  fill="#051635"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_10020_7419">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">Get in Touch</motion.span>
          </Link>

          <div className="h-6 w-px bg-gray-300" />

          <Link href={whatsAppNumber} className="flex flex-1 items-center justify-center gap-2 px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_10047_7213)">
                <path
                  d="M10.0025 0H9.9975C4.48375 0 0 4.485 0 10C0 12.1875 0.705 14.215 1.90375 15.8612L0.6575 19.5763L4.50125 18.3475C6.0825 19.395 7.96875 20 10.0025 20C15.5162 20 20 15.5138 20 10C20 4.48625 15.5162 0 10.0025 0ZM15.8212 14.1213C15.58 14.8025 14.6225 15.3675 13.8587 15.5325C13.3363 15.6437 12.6537 15.7325 10.3562 14.78C7.4175 13.5625 5.525 10.5763 5.3775 10.3825C5.23625 10.1887 4.19 8.80125 4.19 7.36625C4.19 5.93125 4.91875 5.2325 5.2125 4.9325C5.45375 4.68625 5.8525 4.57375 6.235 4.57375C6.35875 4.57375 6.47 4.58 6.57 4.585C6.86375 4.5975 7.01125 4.615 7.205 5.07875C7.44625 5.66 8.03375 7.095 8.10375 7.2425C8.175 7.39 8.24625 7.59 8.14625 7.78375C8.0525 7.98375 7.97 8.0725 7.8225 8.2425C7.675 8.4125 7.535 8.5425 7.3875 8.725C7.2525 8.88375 7.1 9.05375 7.27 9.3475C7.44 9.635 8.0275 10.5937 8.8925 11.3637C10.0087 12.3575 10.9137 12.675 11.2375 12.81C11.4787 12.91 11.7662 12.8863 11.9425 12.6988C12.1663 12.4575 12.4425 12.0575 12.7238 11.6638C12.9237 11.3813 13.1763 11.3462 13.4412 11.4462C13.7113 11.54 15.14 12.2462 15.4338 12.3925C15.7275 12.54 15.9212 12.61 15.9925 12.7338C16.0625 12.8575 16.0625 13.4388 15.8212 14.1213Z"
                  fill="#29A71A"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_10047_7213">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <motion.span className="overflow-hidden whitespace-nowrap text-sm font-heading font-medium">WhatsApp</motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
