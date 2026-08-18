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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error while user is typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }

    setSuccessMessage("");
    setErrorMessage("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Name
    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (name.length > 100) {
      newErrors.name = "Name must not exceed 100 characters.";
    }

    // Phone
    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else {
      // Allows +91 9876543210, 9876543210, +1 5551234567, etc.
      const phoneDigits = phone.replace(/\D/g, "");

      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    // Email
    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      } else if (email.length > 150) {
        newErrors.email = "Email must not exceed 150 characters.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Validate before API request
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

        setErrors({});
      } else {
        const errorMsg = result.message || result.errors?.[0]?.message || "Failed to submit enquiry.";

        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      setErrorMessage("Unable to submit your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 px-4 py-8">
      <h3 className="mb-4 text-3xl font-bold font-heading text-center bg-gradient-to-r from-[#171a20] via-[#e13e3e] to-[#171a20] bg-clip-text text-transparent">ENQUIRE NOW</h3>

      <form onSubmit={handleSubmit} autoComplete="on" noValidate className="space-y-4">
        {/* Name */}
        <div>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={` border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base md:text-base ${
              errors.name ? "border-red-500" : "border-primary"
            }`}
          />

          {errors.name && (
            <p id="name-error" className="text-red-600 text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={` border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base md:text-base ${
              errors.phone ? "border-red-500" : "border-primary"
            }`}
          />

          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-xs mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={` border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base md:text-base ${
              errors.email ? "border-red-500" : "border-primary"
            }`}
          />

          {errors.email && (
            <p id="email-error" className="text-red-600 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full font-semibold text-base font-heading" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>

        {/* Success */}
        {successMessage && <p className="text-green-600 text-sm font-medium text-center mt-2">{successMessage}</p>}

        {/* General Error */}
        {errorMessage && <p className="text-red-600 text-sm font-medium text-center mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}
