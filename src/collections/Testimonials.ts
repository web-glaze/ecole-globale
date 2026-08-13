import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",

  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },

  admin: {
    useAsTitle: "name",
    group: "Content",
    defaultColumns: ["name", "designation", "featured", "sort"],
    hidden: ({ user }) => user?.role !== "admin",
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "designation",
      label: "Designation / Relation",
      type: "text",
      admin: {
        description: "Example: Parent, Alumni, Student",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "review",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 5,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "sort",
      type: "number",
      defaultValue: 1,
    },
  ],
};
