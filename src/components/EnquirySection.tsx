"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EnquirySection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const lines = ["Lorem ipsum dolor sit", "amet consectetur elit"];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage("Enquiry submitted successfully!");

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setErrorMessage(result.message ?? result.errors?.[0]?.message ?? "Failed to submit enquiry.");
      }
    } catch {
      setErrorMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-200 px-4 py-8">
      <div ref={ref} className="mb-10">
        {lines.map((line, index) => {
          const start = index * 0.3;
          const end = start + 0.3;

          const backgroundPositionX = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

          return (
            <motion.h2
              key={index}
              className="text-3xl font-semibold text-center text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #171a20 0%, #e13e3e 50%, #9CA3AF 50%, #9CA3AF 100%)",
                backgroundSize: "200% 100%",
                backgroundPositionX,
              }}
            >
              {line}
            </motion.h2>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-heading">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="rounded-none border-x-0 border-t-0 border-b-2 border-primary p-0 focus-visible:ring-0"
        />

        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-none border-x-0 border-t-0 border-b-2 border-primary p-0 focus-visible:ring-0"
        />

        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="rounded-none border-x-0 border-t-0 border-b-2 border-primary p-0 focus-visible:ring-0"
        />

        <Button className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>

        {successMessage && <p className="mt-2 text-center text-sm font-medium text-green-600">{successMessage}</p>}

        {errorMessage && <p className="mt-2 text-center text-sm font-medium text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
}
