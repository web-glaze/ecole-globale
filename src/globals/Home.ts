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
                  name: "phoneText",
                  type: "text",
                },
                {
                  name: "phoneNumber",
                  type: "text",
                },
                {
                  name: "videos",
                  type: "array",
                  labels: {
                    singular: "Video",
                    plural: "Videos",
                  },
                  fields: [
                    {
                      name: "video",
                      type: "upload",
                      relationTo: "media",
                      filterOptions: {
                        mimeType: {
                          contains: "video",
                        },
                      },
                    },
                  ],
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
              name: "logos",
              label: "Logos",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              required: false,
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
