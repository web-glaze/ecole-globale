"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  function EnquiryForm() {
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
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
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
          const errorMsg = result.message || result.errors?.[0]?.message || "Failed to submit enquiry.";
          setErrorMessage(errorMsg);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong");
      }
      setLoading(false);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 font-heading">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className=" border-b-2 bg-white rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className=" border-b-2 bg-white rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className=" border-b-2 bg-white rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
          required
        />

        <Button className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>

        {successMessage && <p className="text-green-600 text-sm font-medium text-center mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-sm font-medium text-center mt-2">{errorMessage}</p>}
      </form>
    );
  }

  return (
    <main>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-gradient-to-b from-black  to-transparent" />
        <img src={"/hero-image.jpg"} alt="Contact Us" className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
      </div>

      <section className="container mx-auto grid grid-cols-1 gap-10 py-12 lg:grid-cols-12">
        <div id="enquire-now" className="lg:col-span-5 space-y-4 px-4">
          <div className="mb-10">
            <p className="text-primary font-semibold uppercase tracking-wider">Get in Touch</p>
            <h2 className="mt-2 text-4xl font-heading">Contact Us</h2>
            <p className="mt-4 text-gray-600">We'd love to hear from you. Reach out to us for admissions, academics, or any general enquiry.</p>
          </div>
          <div className="flex gap-4">
            <MapPin className="mt-1 h-6 w-6 text-primary" />

            <div>
              <h3 className="font-semibold text-lg">Address</h3>

              <p className="mt-2 text-gray-600 leading-7">
                Ecole Globale International Girls School
                <br />
                Village Horawalla, Near Sahaspur
                <br />
                Dehradun – 248197
                <br />
                Uttarakhand, India
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="mt-1 h-6 w-6 text-primary" />

            <div>
              <h3 className="font-semibold text-lg">Email</h3>

              <div className="mt-2 space-y-1 text-gray-600">
                <a href="mailto:ecoleglobale@gmail.com" className="block hover:text-primary">
                  ecoleglobale@gmail.com
                </a>

                <a href="mailto:principal@ecoleglobale.com" className="block hover:text-primary">
                  principal@ecoleglobale.com
                </a>

                <a href="mailto:viceprincipal@ecoleglobale.com" className="block hover:text-primary">
                  viceprincipal@ecoleglobale.com
                </a>

                <a href="mailto:accounts@ecoleglobale.com" className="block hover:text-primary">
                  accounts@ecoleglobale.com
                </a>
              </div>
            </div>
          </div>
          {/* Phone */}
          <div className="flex gap-4">
            <Phone className="mt-1 h-6 w-6 text-primary" />

            <div>
              <h3 className="font-semibold text-lg">Phone</h3>

              <a href="tel:+919557291888" className="mt-2 block text-gray-600 hover:text-primary">
                +91-9557291888
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 px-4">
          <div className="rounded-sm  p-6 lg:p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-heading">Send an Enquiry</h3>
            <EnquiryForm />
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d55045.1534664545!2d77.881393!3d30.42697!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f2c7de71bad05%3A0xfba63f2a34892007!2sEcole%20Globale%20International%20Girls%20School!5e0!3m2!1sen!2sin!4v1784116164305!5m2!1sen!2sin"
            width="100%"
            height="350"
            loading="lazy"
            className="mt-5"
          ></iframe>
        </div>
      </section>
      <Footer />
    </main>
  );
}
