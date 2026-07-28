"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Don't show if already closed
    if (document.cookie.includes("popup_closed=true")) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    document.cookie = "popup_closed=true; max-age=2592000; path=/; SameSite=Lax";

    setOpen(false);
  };

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
        setSuccessMessage("Thank you! Your enquiry has been submitted successfully.");

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          closePopup();
        }, 2000);
      } else {
        setErrorMessage(result.message ?? result.errors?.[0]?.message ?? "Failed to submit enquiry.");
      }
    } catch {
      setErrorMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) closePopup();
      }}
    >
      <DialogContent
        className="sm:max-w-sm p-0 overflow-hidden bg-gray-950 text-white rounded-none"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Admission Open 2026</h3>
            <p className="mb-5">Fill out the enquiry form and our admission team will contact you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-4 font-heading">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-none border-x-0 border-t-0 border-b border-white p-0 focus-visible:ring-0 bg-transparent placeholder:text-white/80 text-sm"
              />

              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-none border-x-0 border-t-0 border-b border-white p-0 focus-visible:ring-0 bg-transparent placeholder:text-white/80 text-sm"
              />

              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-none border-x-0 border-t-0 border-b border-white p-0 focus-visible:ring-0 bg-transparent placeholder:text-white/80 text-sm"
              />

              <Button type="submit" variant="ghost" className="w-full cursor-pointer bg-white text-black rounded-none py-5" disabled={loading}>
                {loading ? "Submitting..." : "Submit Enquiry"}
              </Button>

              {successMessage && <p className="mt-2 text-center text-sm font-medium text-green-600">{successMessage}</p>}

              {errorMessage && <p className="mt-2 text-center text-sm font-medium text-red-600">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
