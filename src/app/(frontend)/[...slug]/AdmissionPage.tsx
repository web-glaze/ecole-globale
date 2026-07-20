"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { RichText, defaultJSXConverters } from "@payloadcms/richtext-lexical/react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AdmissionPage({ page }: { page: any }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const lines = ["ENQUIRE NOW"];

  const academicYear = [
    { label: "2025-2026", value: "2025-2026" },
    { label: "2026-2027", value: "2026-2027" },
    { label: "2027-2028", value: "2027-2028" },
  ];

  const admissionClass = [
    { label: "I", value: "i" },
    { label: "II", value: "ii" },
    { label: "III", value: "iii" },
    { label: "IV", value: "iv" },
    { label: "V", value: "v" },
    { label: "VI", value: "vi" },
    { label: "VII", value: "vii" },
    { label: "VIII", value: "viii" },
    { label: "IX", value: "ix" },
    { label: "X", value: "x" },
    { label: "XI", value: "xi" },
    { label: "XII", value: "xii" },
  ];

  const salutation = [
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Ms.", value: "Ms." },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
    { label: "Capt.", value: "Capt." },
    { label: "Commander", value: "Commander" },
    { label: "Lt.", value: "Lt." },
    { label: "Lt. Col.", value: "Lt. Col." },
    { label: "Col.", value: "Col." },
    { label: "Maj.", value: "Maj." },
    { label: "Brig.", value: "Brig." },
    { label: "GP Capt", value: "GP Capt" },
    { label: "Shri", value: "Shri" },
    { label: "Smt.", value: "Smt." },
    { label: "Late", value: "Late" },
  ];

  function AdmissionForm() {
    const [formData, setFormData] = useState({
      academicYear: "",
      admissionClass: "",

      studentFirstName: "",
      studentMiddleName: "",
      studentLastName: "",

      dateOfBirth: "",
      email: "",
      aadhaarNumber: "",
      phone: "",

      fatherSalutation: "",
      fatherName: "",

      motherSalutation: "",
      motherName: "",

      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "India",

      agree: false,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      if (!formData.academicYear) {
        setErrorMessage("Please select Academic Year");
        setLoading(false);
        return;
      }

      if (!formData.admissionClass) {
        setErrorMessage("Please select Admission Class");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/admissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (res.ok) {
          setSuccessMessage("Your admission application has been submitted successfully. Our admissions team will contact you shortly.");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setFormData({
            academicYear: "",
            admissionClass: "",

            studentFirstName: "",
            studentMiddleName: "",
            studentLastName: "",

            dateOfBirth: "",
            email: "",
            aadhaarNumber: "",
            phone: "",

            fatherSalutation: "",
            fatherName: "",

            motherSalutation: "",
            motherName: "",

            address: "",
            city: "",
            state: "",
            pinCode: "",
            country: "India",

            agree: false,
          });
        } else {
          setErrorMessage(result.message || result.errors?.[0]?.message || "Failed to submit application.");
        }
      } catch {
        setErrorMessage("Something went wrong.");
      }

      setLoading(false);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 font-heading">
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {/* Student Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Student Details</h3>

          <div className="grid md:grid-cols-6 gap-6">
            <Select value={formData.academicYear} onValueChange={(value) => setFormData((prev) => ({ ...prev, academicYear: value }))}>
              <SelectTrigger className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 px-0 bg-transparent border-primary focus:ring-0 w-full md:col-span-3">
                <SelectValue placeholder="Academic Year" />
              </SelectTrigger>

              <SelectContent className="rounded-none">
                {academicYear.map((item) => (
                  <SelectItem key={item.value} value={item.value!} className="rounded-none">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={formData.admissionClass} onValueChange={(value) => setFormData((prev) => ({ ...prev, admissionClass: value }))}>
              <SelectTrigger className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 px-0 bg-transparent border-primary focus:ring-0 w-full md:col-span-3">
                <SelectValue placeholder="Admission Sought In Class" />
              </SelectTrigger>

              <SelectContent className="rounded-none">
                {admissionClass.map((item) => (
                  <SelectItem key={item.value} value={item.value!} className="rounded-none">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="studentFirstName"
              placeholder="First Name"
              value={formData.studentFirstName}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-2"
            />

            <Input
              name="studentMiddleName"
              placeholder="Middle Name"
              value={formData.studentMiddleName}
              onChange={handleChange}
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-2"
            />

            <Input
              name="studentLastName"
              placeholder="Last Name"
              value={formData.studentLastName}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-2"
            />

            <Input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-3"
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-3"
            />

            <Input
              name="aadhaarNumber"
              placeholder="Aadhaar Number"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-3"
            />

            <Input
              name="phone"
              placeholder="Primary Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-3"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Parent Details</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Select value={formData.fatherSalutation} onValueChange={(value) => setFormData((prev) => ({ ...prev, fatherSalutation: value }))}>
              <SelectTrigger className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 px-0 bg-transparent border-primary focus:ring-0 w-full">
                <SelectValue placeholder="Father's Salutation" />
              </SelectTrigger>

              <SelectContent className="rounded-none">
                {salutation.map((item) => (
                  <SelectItem key={item.value} value={item.value!} className="rounded-none">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="fatherName"
              placeholder="Father Name"
              value={formData.fatherName}
              onChange={handleChange}
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent"
            />

            <Select value={formData.motherSalutation} onValueChange={(value) => setFormData((prev) => ({ ...prev, motherSalutation: value }))}>
              <SelectTrigger className="border-b-2 rounded-none border-l-0 border-r-0 border-t-0 px-0 bg-transparent border-primary focus:ring-0 w-full">
                <SelectValue placeholder="Mother's Salutation" />
              </SelectTrigger>

              <SelectContent className="rounded-none">
                {salutation.map((item) => (
                  <SelectItem key={item.value} value={item.value!} className="rounded-none">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="motherName"
              placeholder="Mother Name"
              value={formData.motherName}
              onChange={handleChange}
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Correspondence Address</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent md:col-span-2"
              rows={4}
              required
            />

            <Input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent"
            />

            <Input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent"
            />

            <Input
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent"
            />

            <Input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary bg-transparent"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 mt-8">
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required />I Agree to the Terms & Conditions
        </label>
        <Button type="submit" className="w-full cursor-pointer py-5 text-lg mt-8" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    );
  }

  return (
    <>
      <main className="">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-10 h-52 bg-gradient-to-b from-black  to-transparent" />
          {page.featuredImage ? (
            <img src={page.featuredImage.cloudinary.secure_url} alt={page.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
          ) : (
            <img src={"/hero-image.jpg"} alt={page.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
          )}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-4xl mx-auto md:py-10">
          <div className="py-8 lg:py-0 mx-auto px-4 container col-span-1 md:col-span-12">
            <h1 className="text-4xl font-heading mb-10">{page.title}</h1>
            <AdmissionForm />
            <BlockRenderer layout={page.layout} />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
