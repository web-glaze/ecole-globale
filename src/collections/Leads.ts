import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",

  admin: {
    group: "Forms",
    useAsTitle: "name",
  },

  access: {
    create: () => true,
    read: ({ req }) => req.user != null,
    update: ({ req }) => req.user != null,
    delete: ({ req }) => req.user != null,
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
  ],
};
