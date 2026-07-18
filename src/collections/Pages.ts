import type { CollectionConfig } from "payload";
import { LayoutBlocks } from "@/blocks";

export const Pages: CollectionConfig = {
  slug: "pages",

  labels: {
    singular: "Page",
    plural: "Pages",
  },

  admin: {
    useAsTitle: "title",
    group: "Pages",
    defaultColumns: ["title", "slug", "updatedAt"],

    preview: (doc) => {
      const slug = doc.slug === "home" ? "" : doc.slug;
      return `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`;
    },
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        components: {
          Cell: {
            path: "@/components/admin/TitleWithActions",
            clientProps: {
              frontendPath: "",
            },
          },
        },
      },
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
      type: "tabs",
      tabs: [
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
        },

        {
          label: "Custom CSS / JS",
          fields: [
            {
              name: "customCSS",
              label: "Custom CSS",
              type: "code",
              admin: {
                language: "css",
              },
            },

            {
              name: "customJS",
              label: "Custom JavaScript",
              type: "code",
              admin: {
                language: "javascript",
              },
            },
          ],
        },
      ],
    },

    // Sidebar
    {
      name: "template",
      label: "Page Template",
      type: "select",
      defaultValue: "default",
      admin: {
        position: "sidebar",
      },
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Full Width",
          value: "full-width",
        },
      ],
    },

    {
      name: "hideTitle",
      label: "Hide Page Title",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "pageClass",
      label: "Page CSS Class",
      type: "text",
      admin: {
        description: "Optional CSS class added to the page wrapper.",
        position: "sidebar",
      },
    },
  ],
};
