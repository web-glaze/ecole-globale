import type { CollectionConfig } from "payload";
import { sendLeadEmail } from "@/lib/sendLeadEmail";

export const Leads: CollectionConfig = {
  slug: "leads",

  admin: {
    group: "Forms",
    useAsTitle: "name",
  },

  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  timestamps: true,

  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "create") {
          if (req) {
            const host = req.headers?.get("host") || "";
            let ipAddress = req.headers?.get("x-forwarded-for")?.split(",")[0].trim() || req.headers?.get("x-real-ip") || "Unknown";

            if (ipAddress === "Unknown" && (host.includes("localhost") || host.includes("127.0.0.1"))) {
              ipAddress = "::ffff:127.0.0.1";
            }

            const userAgent = req.headers?.get("user-agent") || "Unknown";
            let pageUrl = req.headers?.get("referer") || req.headers?.get("origin") || "Unknown";

            if (pageUrl.includes("/admin")) {
              pageUrl = "localhost";
            }

            return {
              ...data,
              ipAddress,
              userAgent,
              pageUrl,
              submittedAt: new Date(),
            };
          }
          return {
            ...data,
            submittedAt: new Date(),
          };
        }
        return data;
      },
    ],
    // Send email AFTER lead is successfully saved
    afterChange: [
      async ({ doc, operation }) => {
        // Only send email for new leads
        if (operation !== "create") {
          return doc;
        }

        try {
          await sendLeadEmail({
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            message: doc.message,
            pageUrl: doc.pageUrl,
            ipAddress: doc.ipAddress,
            userAgent: doc.userAgent,
            submittedAt: doc.submittedAt,
          });

          console.log("✅ Lead notification email sent");
        } catch (error) {
          // Don't prevent the lead from being saved
          console.error("❌ Lead email notification failed:", error);
        }

        return doc;
      },
    ],
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "pageUrl",
      label: "Page URL",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "userAgent",
      label: "Browser User Agent",
      type: "textarea",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "ipAddress",
      label: "IP Address",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "submittedAt",
      label: "Submission Time",
      type: "date",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};
