"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VacancyForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    postAppliedFor: "",
    subject: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const res = await fetch("/api/vacancies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage("Your application has been submitted successfully!");

        setFormData({
          name: "",
          phone: "",
          email: "",
          postAppliedFor: "",
          subject: "",
        });
      } else {
        setErrorMessage(result.message ?? result.errors?.[0]?.message ?? "Failed to submit application.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 px-4 py-8">
      <h3 className="mb-6 text-center font-heading text-3xl font-bold bg-gradient-to-r from-[#171a20] via-[#e13e3e] to-[#171a20] bg-clip-text text-transparent">APPLY NOW</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base"
        />

        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base"
        />

        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base"
        />

        <select
          name="postAppliedFor"
          value={formData.postAppliedFor}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-primary bg-transparent py-2 text-base outline-none"
        >
          <option value="">Post Applied For</option>
          <option value="PGT">PGT</option>
          <option value="TGT">TGT</option>
        </select>

        <Input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary text-base"
        />

        <Button type="submit" className="w-full font-heading text-base font-semibold" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>

        {successMessage && <p className="mt-2 text-center text-sm font-medium text-green-600">{successMessage}</p>}

        {errorMessage && <p className="mt-2 text-center text-sm font-medium text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
}
