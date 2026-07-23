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
