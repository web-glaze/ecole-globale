import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",

  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },

  admin: {
    group: "Pages",
  },

  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                {
                  name: "showEnquiryForm",
                  label: "Show Enquiry Form",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "autoPlay",
                  label: "Auto Play",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "autoPlayDelay",
                  label: "Autoplay Delay (ms)",
                  type: "number",
                  defaultValue: 5000,
                  admin: {
                    condition: (_, siblingData) => siblingData.autoPlay,
                  },
                },
                {
                  name: "slides",
                  label: "Hero Slides",
                  type: "array",
                  minRows: 1,
                  labels: {
                    singular: "Slide",
                    plural: "Slides",
                  },
                  fields: [
                    {
                      name: "image",
                      label: "Image",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Welcome",
          fields: [
            {
              name: "welcome",
              type: "group",
              fields: [
                {
                  name: "smallHeading",
                  type: "text",
                  defaultValue: "Welcome to",
                },
                {
                  name: "heading",
                  type: "text",
                  defaultValue: "Ecole Globale",
                },
                {
                  name: "description",
                  type: "richText",
                },
                {
                  name: "cards",
                  type: "array",
                  labels: {
                    singular: "Card",
                    plural: "Cards",
                  },
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                    },
                    {
                      name: "title",
                      type: "text",
                    },
                    {
                      name: "description",
                      type: "textarea",
                    },
                    {
                      name: "buttonText",
                      type: "text",
                    },
                    {
                      name: "buttonLink",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Featured",
          fields: [
            {
              name: "featured",
              type: "group",
              fields: [
                {
                  name: "items",
                  type: "array",
                  labels: {
                    singular: "Featured Item",
                    plural: "Featured Items",
                  },
                  fields: [
                    {
                      name: "type",
                      type: "select",
                      defaultValue: "image",
                      options: [
                        { label: "Image", value: "image" },
                        { label: "Video (Embed/URL)", value: "video" },
                      ],
                    },
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type !== "video",
                      },
                    },
                    {
                      name: "videoUrl",
                      type: "text",
                      label: "Video URL / Embed URL",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "video",
                      },
                    },
                    {
                      name: "title",
                      type: "text",
                    },
                    {
                      name: "link",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Testimonials",
          fields: [
            {
              name: "testimonialsSection",
              type: "group",
              fields: [
                {
                  name: "showSection",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "heading",
                  type: "text",
                  defaultValue: "Words from Parents: Who Matter Most",
                },
                {
                  name: "subHeading",
                  type: "textarea",
                },
                {
                  name: "testimonials",
                  type: "relationship",
                  relationTo: "testimonials",
                  hasMany: true,
                },
              ],
            },
          ],
        },
        {
          label: "Admission",
          fields: [
            {
              name: "admission",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  defaultValue: "Admissions 2026–27",
                },
                {
                  name: "heading",
                  type: "text",
                  defaultValue: "Three Steps to Joining Ecole Globale",
                },
                {
                  name: "description",
                  type: "textarea",
                },
                {
                  name: "steps",
                  type: "array",
                  labels: {
                    singular: "Step",
                    plural: "Steps",
                  },
                  fields: [
                    {
                      name: "number",
                      type: "text",
                    },
                    {
                      name: "icon",
                      type: "select",
                      options: [
                        {
                          label: "File",
                          value: "file",
                        },
                        {
                          label: "Clipboard",
                          value: "clipboard",
                        },
                        {
                          label: "School",
                          value: "school",
                        },
                      ],
                    },
                    {
                      name: "title",
                      type: "text",
                    },
                    {
                      name: "description",
                      type: "textarea",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Updates & Press Releases",
          fields: [
            {
              name: "updatesSection",
              type: "group",
              fields: [
                {
                  name: "heading",
                  type: "text",
                },
                {
                  name: "phoneText",
                  type: "text",
                },
                {
                  name: "phoneNumber",
                  type: "text",
                },
                {
                  name: "items",
                  type: "array",
                  labels: {
                    singular: "Item",
                    plural: "Items",
                  },
                  fields: [
                    {
                      name: "type",
                      type: "radio",
                      defaultValue: "video",
                      options: [
                        {
                          label: "Video",
                          value: "video",
                        },
                        {
                          label: "Press Release",
                          value: "press",
                        },
                      ],
                    },

                    // Video
                    {
                      name: "video",
                      type: "upload",
                      relationTo: "media",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "video",
                      },
                      filterOptions: {
                        mimeType: {
                          contains: "video",
                        },
                      },
                    },

                    // Press Release
                    {
                      name: "title",
                      type: "text",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "press",
                      },
                    },
                    {
                      name: "description",
                      type: "textarea",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "press",
                      },
                    },
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "press",
                      },
                    },
                    {
                      name: "link",
                      type: "text",
                      label: "Read More URL",
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === "press",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Logo Strip",
          fields: [
            {
              name: "logos",
              label: "Logos",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              required: false,
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
  ],
};
