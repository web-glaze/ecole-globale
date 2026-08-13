import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",

  admin: {
    group: "Content",
    useAsTitle: "alt",
    hidden: ({ user }) => user?.role !== "admin",
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },

  upload: {
    staticDir: "media",

    mimeTypes: ["image/*", "video/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],

    adminThumbnail: "thumbnail",
  },

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;

        if (!data.alt && data.filename) {
          data.alt = data.filename
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase());
        }

        return data;
      },
    ],
  },

  fields: [
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        {
          name: "alt",
          label: "Alt Text",
          type: "text",
          admin: {
            description: "Automatically generated from the filename. You can edit it if needed.",
          },
        },
        {
          name: "caption",
          label: "Caption",
          type: "textarea",
        },
      ],
    },
  ],
};
