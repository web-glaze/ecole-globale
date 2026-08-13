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
  const [cv, setCv] = useState<File | null>(null);
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
      if (!cv) {
        setErrorMessage("Please upload your CV");
        return;
      }

      const mediaFormData = new FormData();
      mediaFormData.append("file", cv);

      mediaFormData.append("_payload", JSON.stringify({}));

      const mediaRes = await fetch("/api/media", {
        method: "POST",
        body: mediaFormData,
      });

      const mediaResult = await mediaRes.json();

      if (!mediaRes.ok) {
        console.error("Media upload failed:", mediaResult);
        setErrorMessage(mediaResult?.errors?.[0]?.message || mediaResult?.message || "Failed to upload CV");
        return;
      }

      const mediaId = mediaResult.doc?.id || mediaResult.id;

      if (!mediaId) {
        setErrorMessage("CV uploaded but no ID returned");
        return;
      }

      const vacancyData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        postAppliedFor: formData.postAppliedFor,
        subject: formData.subject,
        cv: mediaId,
      };

      const res = await fetch("/api/vacancies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vacancyData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Vacancy API error:", result);
        setErrorMessage(result?.errors?.[0]?.message || result?.message || `Submission failed (${res.status})`);
        return;
      }

      setSuccessMessage("Your application has been submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        postAppliedFor: "",
        subject: "",
      });
      setCv(null);

      const fileInput = document.getElementById("cv") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Vacancy submission error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload CV</label>

          <label
            htmlFor="cv"
            className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-dashed border-primary bg-transparent px-4 py-4 transition hover:bg-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">📎</div>

            <div className="flex-1">
              <p className="text-sm font-medium">{cv ? cv.name : "Attach your CV"}</p>

              <p className="text-xs text-gray-500">PDF, DOC or DOCX • Max 5MB</p>
            </div>

            <span className="rounded-md border px-3 py-2 text-sm font-medium">Browse</span>
          </label>

          <Input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            required
            className="hidden"
            onChange={(e) => {
              setCv(e.target.files?.[0] || null);
            }}
          />
        </div>

        <Button type="submit" className="w-full font-heading text-base font-semibold" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>

        {successMessage && <p className="mt-2 text-center text-sm font-medium text-green-600">{successMessage}</p>}

        {errorMessage && <p className="mt-2 text-center text-sm font-medium text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
}
