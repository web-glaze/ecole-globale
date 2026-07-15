import type { CollectionConfig } from "payload";
import { LayoutBlocks } from "@/blocks";

export const LatestUpdates: CollectionConfig = {
  slug: "latest-updates",

  labels: {
    singular: "Latest Update",
    plural: "Latest Updates",
  },

  admin: {
    useAsTitle: "title",
    group: "Pages",

    defaultColumns: ["title", "author", "publishedAt", "updatedAt"],

    preview: (doc) => {
      if (!doc?.slug) return "";

      return `${process.env.NEXT_PUBLIC_SITE_URL}/latest-updates/${doc.slug}`;
    },
  },

  access: {
    read: () => true,
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },

            {
              name: "layout",
              type: "blocks",
              blocks: LayoutBlocks,
            },
          ],
        },

        {
          label: "SEO",
          fields: [
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
                  type: "relationship",
                  relationTo: "media",
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;

            return data?.title
              ?.toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-");
          },
        ],
      },
    },

    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
      defaultValue: ({ user }) => user?.id,
    },

    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "publishedAt",
      label: "Publication Date",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeValidate: [
          ({ value, operation }) => {
            if (!value && operation === "create") {
              return new Date();
            }

            return value;
          },
        ],
      },
    },
  ],
};
