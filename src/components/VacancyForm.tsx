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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ---------------------------------------------------------
  // HANDLE FIELD CHANGE
  // ---------------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // ---------------------------------------------------------
  // VALIDATE FORM
  // ---------------------------------------------------------

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const postAppliedFor = formData.postAppliedFor.trim();
    const subject = formData.subject.trim();

    // -------------------------------------------------------
    // Name
    // -------------------------------------------------------

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (name.length > 100) {
      newErrors.name = "Name must not exceed 100 characters.";
    }

    // -------------------------------------------------------
    // Phone
    // -------------------------------------------------------

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else {
      // Allows:
      // +91 9876543210
      // 9876543210
      // +1 5551234567
      // +44 20 1234 5678
      const phoneDigits = phone.replace(/\D/g, "");

      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    // -------------------------------------------------------
    // Email
    // -------------------------------------------------------

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

    // -------------------------------------------------------
    // Post Applied For
    // -------------------------------------------------------

    if (!postAppliedFor) {
      newErrors.postAppliedFor = "Please select the post you are applying for.";
    }

    // -------------------------------------------------------
    // Subject
    // -------------------------------------------------------

    if (!subject) {
      newErrors.subject = "Please enter the subject.";
    } else if (subject.length < 2) {
      newErrors.subject = "Subject must be at least 2 characters.";
    } else if (subject.length > 200) {
      newErrors.subject = "Subject must not exceed 200 characters.";
    }

    // -------------------------------------------------------
    // CV
    // -------------------------------------------------------

    if (!cv) {
      newErrors.cv = "Please upload your CV.";
    } else {
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

      const allowedExtensions = [".pdf", ".doc", ".docx"];

      const fileName = cv.name.toLowerCase();

      const hasValidType = allowedTypes.includes(cv.type);

      const hasValidExtension = allowedExtensions.some((extension) => fileName.endsWith(extension));

      if (!hasValidType && !hasValidExtension) {
        newErrors.cv = "Please upload a PDF, DOC or DOCX file.";
      }

      // 5 MB
      const maxSize = 5 * 1024 * 1024;

      if (cv.size > maxSize) {
        newErrors.cv = "CV must not exceed 5MB.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------------------
  // HANDLE CV
  // ---------------------------------------------------------

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setCv(file);

    // Remove CV error when user selects a file
    if (errors.cv) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.cv;
        return updated;
      });
    }

    setSuccessMessage("");
    setErrorMessage("");
  };

  // ---------------------------------------------------------
  // HANDLE SUBMIT
  // ---------------------------------------------------------

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
      // -----------------------------------------------------
      // Upload CV
      // -----------------------------------------------------

      const mediaFormData = new FormData();

      mediaFormData.append("file", cv!);
      mediaFormData.append("_payload", JSON.stringify({}));

      const mediaRes = await fetch("/api/media", {
        method: "POST",
        body: mediaFormData,
      });

      const mediaResult = await mediaRes.json();

      if (!mediaRes.ok) {
        console.error("Media upload failed:", mediaResult);

        setErrorMessage(mediaResult?.errors?.[0]?.message || mediaResult?.message || "Failed to upload CV.");

        return;
      }

      const mediaId = mediaResult.doc?.id || mediaResult.id;

      if (!mediaId) {
        setErrorMessage("CV uploaded but no ID was returned.");

        return;
      }

      // -----------------------------------------------------
      // Submit vacancy application
      // -----------------------------------------------------

      const vacancyData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        postAppliedFor: formData.postAppliedFor.trim(),
        subject: formData.subject.trim(),
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

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setSuccessMessage("Your application has been submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        postAppliedFor: "",
        subject: "",
      });

      setCv(null);
      setErrors({});

      // Clear file input
      const fileInput = document.getElementById("cv") as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
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

      <form onSubmit={handleSubmit} autoComplete="on" noValidate className="space-y-5">
        {/* -------------------------------------------------
            NAME
        -------------------------------------------------- */}

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
            className={`border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base ${errors.name ? "border-red-500" : "border-primary"}`}
          />

          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* -------------------------------------------------
            PHONE
        -------------------------------------------------- */}

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
            className={`border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base ${errors.phone ? "border-red-500" : "border-primary"}`}
          />

          {errors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* -------------------------------------------------
            EMAIL
        -------------------------------------------------- */}

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
            className={`border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base ${errors.email ? "border-red-500" : "border-primary"}`}
          />

          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* -------------------------------------------------
            POST APPLIED FOR
        -------------------------------------------------- */}

        <div>
          <select
            id="postAppliedFor"
            name="postAppliedFor"
            value={formData.postAppliedFor}
            onChange={handleChange}
            aria-describedby={errors.postAppliedFor ? "postAppliedFor-error" : undefined}
            className={`w-full border-b-2 bg-transparent py-2 text-base outline-none ${errors.postAppliedFor ? "border-red-500" : "border-primary"}`}
          >
            <option value="">Post Applied For</option>

            <option value="PGT">PGT</option>

            <option value="TGT">TGT</option>
          </select>

          {errors.postAppliedFor && (
            <p id="postAppliedFor-error" className="mt-1 text-xs text-red-600">
              {errors.postAppliedFor}
            </p>
          )}
        </div>

        {/* -------------------------------------------------
            SUBJECT
        -------------------------------------------------- */}

        <div>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={`border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 text-base ${errors.subject ? "border-red-500" : "border-primary"}`}
          />

          {errors.subject && (
            <p id="subject-error" className="mt-1 text-xs text-red-600">
              {errors.subject}
            </p>
          )}
        </div>

        {/* -------------------------------------------------
            CV
        -------------------------------------------------- */}

        <div className="space-y-2">
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
            Upload CV
          </label>

          <label
            htmlFor="cv"
            className={`flex cursor-pointer items-center gap-3 rounded-md border-2 border-dashed bg-transparent px-4 py-4 transition hover:bg-gray-100 ${
              errors.cv ? "border-red-500" : "border-primary"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">📎</div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{cv ? cv.name : "Attach your CV"}</p>

              <p className="text-xs text-gray-500">PDF, DOC or DOCX • Max 5MB</p>
            </div>

            <span className="rounded-md border px-3 py-2 text-sm font-medium">Browse</span>
          </label>

          <Input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvChange} aria-describedby={errors.cv ? "cv-error" : undefined} />

          {errors.cv && (
            <p id="cv-error" className="text-xs text-red-600">
              {errors.cv}
            </p>
          )}
        </div>

        {/* -------------------------------------------------
            SUBMIT
        -------------------------------------------------- */}

        <Button type="submit" className="w-full font-heading text-base font-semibold" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>

        {/* -------------------------------------------------
            SUCCESS
        -------------------------------------------------- */}

        {successMessage && <p className="mt-2 text-center text-sm font-medium text-green-600">{successMessage}</p>}

        {/* -------------------------------------------------
            GENERAL ERROR
        -------------------------------------------------- */}

        {errorMessage && <p className="mt-2 text-center text-sm font-medium text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
}
