import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",

  admin: {
    group: "Content",
    useAsTitle: "alt",
  },

  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "card",
        width: 600,
      },
      {
        name: "hero",
        width: 1600,
      },
    ],
    mimeTypes: ["image/*"],
  },

  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
  ],
};
