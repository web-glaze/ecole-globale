import type { CollectionConfig } from "payload";
import { sendVacancyEmail } from "@/lib/sendVacancyEmail";

export const Vacancies: CollectionConfig = {
  slug: "vacancies",

  admin: {
    group: "Forms",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "phone", "postAppliedFor", "subject", "submittedAt"],
  },

  access: {
    create: () => true,

    read: ({ req }) => {
      if (!req.user) return false;

      return req.user.role === "admin" || req.user.role === "leads-manager";
    },

    update: ({ req }) => {
      if (!req.user) return false;

      return req.user.role === "admin" || req.user.role === "leads-manager";
    },

    delete: ({ req }) => {
      return req.user?.role === "admin";
    },
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

    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== "create") {
          return doc;
        }

        try {
          await sendVacancyEmail({
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            postAppliedFor: doc.postAppliedFor,
            subject: doc.subject,
            pageUrl: doc.pageUrl,
            ipAddress: doc.ipAddress,
            userAgent: doc.userAgent,
            submittedAt: doc.submittedAt,
          });

          console.log("✅ Vacancy application email sent");
        } catch (error) {
          console.error("❌ Vacancy email notification failed:", error);
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
      name: "phone",
      type: "text",
      required: true,
    },

    {
      name: "email",
      type: "email",
      required: true,
    },

    {
      name: "postAppliedFor",
      label: "Post Applied For",
      type: "select",
      required: true,
      options: [
        {
          label: "PGT",
          value: "PGT",
        },
        {
          label: "TGT",
          value: "TGT",
        },
      ],
    },

    {
      name: "subject",
      label: "Subject",
      type: "text",
      required: true,
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
