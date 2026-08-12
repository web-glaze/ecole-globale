"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EnquirySection() {
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
      <h3 className="mb-4 text-3xl font-bold font-heading text-center bg-gradient-to-r from-[#171a20] via-[#e13e3e] to-[#171a20] bg-clip-text text-transparent">ENQUIRE NOW</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base md:text-base"
        />

        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base md:text-base"
        />

        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base md:text-base"
        />

        <Button className="w-full font-semibold text-base font-heading" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>

        {successMessage && <p className="mt-2 text-center text-sm font-medium text-green-600">{successMessage}</p>}

        {errorMessage && <p className="mt-2 text-center text-sm font-medium text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
}
