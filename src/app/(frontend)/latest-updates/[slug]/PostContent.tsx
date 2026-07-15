"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { RichText, defaultJSXConverters } from "@payloadcms/richtext-lexical/react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Clock, User } from "lucide-react";

export default function PostContent({ post }: { post: any }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const lines = ["Lorem ipsum dolor sit", "amet consectetur elit"];

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
          className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className=" border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
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
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-linear-to-b from-black  to-transparent" />
        <img src={"/hero-image.jpg"} alt={post.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 container mx-auto md:py-10">
        <div id="enquire-now" className="mx-auto container col-span-1 md:col-span-3 ">
          <div className="py-8 px-4 bg-gray-200">
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

            <EnquiryForm />
          </div>
        </div>
        <div className="py-8 lg:py-0 mx-auto px-4 container col-span-1 md:col-span-9">
          <div className="mb-10">
            <h1 className="text-4xl font-heading ">{post.title}</h1>
            <div className="mt-4 flex gap-6 text-sm py-2 border-t border-b border-gray-200">
              <div className="flex gap-2 items-center text-gray-800">
                <User />
                <span>By {post.author?.name ? post.author.name : "Ecole Globale"}</span>
              </div>
              <div className="flex gap-2 items-center text-gray-800">
                <Clock />
                <span>
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </span>
              </div>
            </div>
          </div>
          <BlockRenderer layout={post.layout} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
