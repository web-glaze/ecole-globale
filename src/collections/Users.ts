import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",

  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => user?.role !== "admin",
  },

  auth: true,

  access: {
    create: ({ req }) => {
      return req.user?.role === "admin";
    },
    read: ({ req, id }) => {
      if (!req.user) return false;

      if (req.user.role === "admin") {
        return true;
      }

      return req.user.id === id;
    },

    update: ({ req, id }) => {
      if (!req.user) return false;

      if (req.user.role === "admin") {
        return true;
      }

      return req.user.id === id;
    },

    delete: ({ req }) => {
      return req.user?.role === "admin";
    },
  },

  fields: [
    {
      name: "role",
      type: "select",
      required: true,

      defaultValue: "leads-manager",

      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Leads Manager",
          value: "leads-manager",
        },
      ],

      access: {
        update: ({ req }) => {
          return req.user?.role === "admin";
        },
      },
    },
  ],
};
