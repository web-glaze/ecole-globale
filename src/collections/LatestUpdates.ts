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
    hidden: ({ user }) => user?.role !== "admin",
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
              admin: {
                components: {
                  Cell: {
                    path: "@/components/admin/TitleWithActions",
                    clientProps: {
                      frontendPath: "/latest-updates",
                    },
                  },
                },
              },
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
                  type: "collapsible",
                  label: "General SEO",
                  fields: [
                    {
                      name: "metaTitle",
                      label: "Meta Title",
                      type: "text",
                      admin: {
                        placeholder: "Leave empty to use the page title",
                      },
                    },
                    {
                      name: "metaDescription",
                      label: "Meta Description",
                      type: "textarea",
                      admin: {
                        placeholder: "Leave empty to use the default site description",
                      },
                    },
                    {
                      name: "keywords",
                      label: "Meta Keywords",
                      type: "text",
                      admin: {
                        description: "Comma separated keywords.",
                        placeholder: "school, boarding school, girls school",
                      },
                    },
                    {
                      name: "canonicalURL",
                      label: "Canonical URL",
                      type: "text",
                      admin: {
                        placeholder: "https://example.com/current-page",
                      },
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Open Graph Setting",
                  fields: [
                    {
                      name: "ogTitle",
                      label: "OG Title",
                      type: "text",
                      admin: {
                        placeholder: "Defaults to Meta Title if left empty.",
                      },
                    },
                    {
                      name: "ogDescription",
                      label: "OG Description",
                      type: "textarea",
                      admin: {
                        placeholder: "Defaults to Meta Description if left empty.",
                      },
                    },
                    {
                      name: "ogImage",
                      label: "OG Image",
                      type: "upload",
                      relationTo: "media",
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Robots",

                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "noIndex",
                          label: "No Index",
                          type: "checkbox",
                          admin: {
                            width: "20%",
                          },
                        },
                        {
                          name: "noFollow",
                          label: "No Follow",
                          type: "checkbox",
                          admin: {
                            width: "20%",
                          },
                        },
                        {
                          name: "noArchive",
                          label: "No Archive",
                          type: "checkbox",
                          admin: {
                            width: "20%",
                          },
                        },
                        {
                          name: "noImageIndex",
                          label: "No Image Index",
                          type: "checkbox",
                          admin: {
                            width: "20%",
                          },
                        },
                        {
                          name: "noSnippet",
                          label: "No Snippet",
                          type: "checkbox",
                          admin: {
                            width: "20%",
                          },
                        },
                      ],
                    },
                  ],
                },

                // Advanced
                {
                  type: "collapsible",
                  label: "Advanced Robots",
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "maxSnippet",
                          label: "Max Snippet",
                          type: "number",
                          defaultValue: -1,
                          admin: {
                            width: "33%",
                          },
                        },
                        {
                          name: "maxVideoPreview",
                          label: "Max Video Preview",
                          type: "number",
                          defaultValue: -1,
                          admin: {
                            width: "33%",
                          },
                        },
                        {
                          name: "maxImagePreview",
                          label: "Max Image Preview",
                          type: "select",
                          defaultValue: "large",
                          admin: {
                            width: "34%",
                          },
                          options: [
                            {
                              label: "Large",
                              value: "large",
                            },
                            {
                              label: "Standard",
                              value: "standard",
                            },
                            {
                              label: "None",
                              value: "none",
                            },
                          ],
                        },
                      ],
                    },
                  ],
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
