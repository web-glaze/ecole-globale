import type { CollectionConfig } from "payload";
import { LayoutBlocks } from "@/blocks";

export const Pages: CollectionConfig = {
  slug: "pages",

  labels: {
    singular: "Dynamic Page",
    plural: "Dynamic Pages",
  },

  admin: {
    useAsTitle: "title",
    group: "Pages",
    defaultColumns: ["title", "slug", "updatedAt"],
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "Example: about-us",
      },
    },

    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },

    {
      name: "layout",
      type: "blocks",
      blocks: LayoutBlocks,
    },

    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "metaTitle",
          type: "text",
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "canonicalURL",
          type: "text",
        },
        {
          name: "noIndex",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
};
