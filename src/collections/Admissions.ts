import type { CollectionConfig } from "payload";

export const Admissions: CollectionConfig = {
  slug: "admissions",

  admin: {
    group: "Forms",
    useAsTitle: "studentName",
    defaultColumns: ["studentName", "admissionClass", "academicYear", "phone", "submittedAt"],
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
          let pageUrl = "Unknown";
          let ipAddress = "Unknown";
          let userAgent = "Unknown";

          if (req) {
            const host = req.headers?.get("host") || "";

            ipAddress = req.headers?.get("x-forwarded-for")?.split(",")[0].trim() || req.headers?.get("x-real-ip") || "Unknown";

            if (ipAddress === "Unknown" && (host.includes("localhost") || host.includes("127.0.0.1"))) {
              ipAddress = "::ffff:127.0.0.1";
            }

            userAgent = req.headers?.get("user-agent") || "Unknown";

            pageUrl = req.headers?.get("referer") || req.headers?.get("origin") || "Unknown";

            if (pageUrl.includes("/admin")) {
              pageUrl = "localhost";
            }
          }

          return {
            ...data,
            studentName: [data.studentFirstName, data.studentMiddleName, data.studentLastName].filter(Boolean).join(" "),
            pageUrl,
            ipAddress,
            userAgent,
            submittedAt: new Date(),
          };
        }

        return {
          ...data,
          studentName: [data.studentFirstName, data.studentMiddleName, data.studentLastName].filter(Boolean).join(" "),
        };
      },
    ],
  },

  fields: [
    {
      type: "collapsible",
      label: "Student Details",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "academicYear",
              label: "Academic Year",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "admissionClass",
              label: "Admission Sought In Class",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },

        {
          type: "row",
          fields: [
            {
              name: "studentFirstName",
              label: "First Name",
              type: "text",
              required: true,
              admin: { width: "33%" },
            },
            {
              name: "studentMiddleName",
              label: "Middle Name",
              type: "text",
              admin: { width: "33%" },
            },
            {
              name: "studentLastName",
              label: "Last Name",
              type: "text",
              required: true,
              admin: { width: "34%" },
            },
          ],
        },

        {
          name: "studentName",
          type: "text",
          admin: {
            hidden: true,
          },
        },

        {
          type: "row",
          fields: [
            {
              name: "dateOfBirth",
              label: "Date of Birth",
              type: "date",
              required: true,
              admin: {
                width: "50%",
                date: {
                  pickerAppearance: "dayOnly",
                },
              },
            },
            {
              name: "email",
              type: "email",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },

        {
          type: "row",
          fields: [
            {
              name: "aadhaarNumber",
              label: "Aadhaar No.",
              type: "text",
              admin: { width: "50%" },
            },
            {
              name: "phone",
              label: "Primary Contact (WhatsApp)",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "Parent Details",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "fatherSalutation",
              label: "Father's Salutation",
              type: "select",
              options: [
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
              ],
              admin: { width: "25%" },
            },
            {
              name: "fatherName",
              label: "Father's Name",
              type: "text",
              admin: { width: "75%" },
            },
          ],
        },

        {
          type: "row",
          fields: [
            {
              name: "motherSalutation",
              label: "Mother's Salutation",
              type: "select",
              options: [
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
              ],
              admin: { width: "25%" },
            },
            {
              name: "motherName",
              label: "Mother's Name",
              type: "text",
              admin: { width: "75%" },
            },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "Correspondence Address",
      fields: [
        {
          name: "address",
          type: "textarea",
          required: true,
        },

        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "state",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },

        {
          type: "row",
          fields: [
            {
              name: "pinCode",
              label: "Pin Code",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "country",
              type: "text",
              defaultValue: "India",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "Declaration",
      fields: [
        {
          name: "agree",
          label: "I Agree to the Terms & Conditions",
          type: "checkbox",
          required: true,
        },
      ],
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
      name: "ipAddress",
      label: "IP Address",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "userAgent",
      label: "User Agent",
      type: "textarea",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "submittedAt",
      label: "Submitted At",
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
