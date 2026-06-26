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
        // ======================================================
        // HERO
        // ======================================================
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
                  name: "slides",
                  type: "array",
                  minRows: 1,
                  labels: {
                    singular: "Slide",
                    plural: "Slides",
                  },
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                    {
                      name: "smallHeading",
                      type: "text",
                    },
                    {
                      name: "heading",
                      type: "text",
                      required: true,
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

        // ======================================================
        // WELCOME
        // ======================================================
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
                },
                {
                  name: "heading",
                  type: "text",
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
                      name: "title",
                      type: "text",
                    },
                    {
                      name: "subtitle",
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

        // ======================================================
        // FEATURED
        // ======================================================
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
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
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

        // ======================================================
        // TESTIMONIAL
        // ======================================================
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

        // ======================================================
        // ADMISSION
        // ======================================================
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
                },
                {
                  name: "heading",
                  type: "text",
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

        // ======================================================
        // VIDEOS
        // ======================================================
        {
          label: "Videos",
          fields: [
            {
              name: "videosSection",
              type: "group",
              fields: [
                {
                  name: "heading",
                  type: "text",
                },
                {
                  name: "videos",
                  type: "relationship",
                  relationTo: "media",
                  hasMany: true,
                },
              ],
            },
          ],
        },

        // ======================================================
        // LOGO STRIP
        // ======================================================
        {
          label: "Logo Strip",
          fields: [
            {
              name: "logoStrip",
              type: "group",
              fields: [
                {
                  name: "logos",
                  type: "relationship",
                  relationTo: "media",
                  hasMany: true,
                },
              ],
            },
          ],
        },

        // ======================================================
        // SEO
        // ======================================================
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
              ],
            },
          ],
        },
      ],
    },
  ],
};
