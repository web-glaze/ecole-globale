import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",

  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },

  admin: {
    group: "Settings",
  },

  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "siteName",
              label: "Site Name",
              type: "text",
              required: true,
            },
            {
              name: "tagline",
              type: "text",
            },
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "favicon",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              name: "email",
              type: "email",
            },
            {
              name: "phone",
              type: "text",
            },
            {
              name: "whatsApp",
              label: "WhatsApp Number",
              type: "text",
            },
            {
              name: "admissionPhone",
              type: "text",
            },
            {
              name: "admissionEmail",
              type: "email",
            },
          ],
        },
        {
          label: "Address",
          fields: [
            {
              name: "address",
              type: "textarea",
            },
            {
              name: "googleMap",
              label: "Google Map Embed URL",
              type: "text",
            },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "facebook",
              type: "text",
            },
            {
              name: "instagram",
              type: "text",
            },
            {
              name: "youtube",
              type: "text",
            },
            {
              name: "linkedin",
              type: "text",
            },
            {
              name: "twitter",
              type: "text",
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "defaultMetaTitle",
              label: "Default Meta Title",
              type: "text",
              admin: {
                description: "Used when a page doesn't have its own Meta Title.",
              },
            },
            {
              name: "defaultMetaDescription",
              label: "Default Meta Description",
              type: "textarea",
              admin: {
                description: "Used when a page doesn't have its own Meta Description.",
              },
            },
            {
              name: "defaultOgImage",
              label: "Default Open Graph Image",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Default social sharing image.",
              },
            },

            {
              type: "collapsible",
              label: "Robots Meta",
              fields: [
                {
                  name: "robotsIndex",
                  label: "Index",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "robotsNoIndex",
                  label: "No Index",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "robotsNoFollow",
                  label: "No Follow",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "robotsNoArchive",
                  label: "No Archive",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "robotsNoImageIndex",
                  label: "No Image Index",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "robotsNoSnippet",
                  label: "No Snippet",
                  type: "checkbox",
                  defaultValue: false,
                },
              ],
            },

            {
              type: "collapsible",
              label: "Advanced Robots Meta",
              fields: [
                {
                  name: "maxSnippet",
                  label: "Snippet",
                  type: "number",
                  defaultValue: -1,
                  admin: {
                    description: "Maximum text snippet length. Use -1 for no limit.",
                  },
                },
                {
                  name: "maxVideoPreview",
                  label: "Video Preview",
                  type: "number",
                  defaultValue: -1,
                  admin: {
                    description: "Maximum video preview length. Use -1 for no limit.",
                  },
                },
                {
                  name: "maxImagePreview",
                  label: "Image Preview",
                  type: "select",
                  defaultValue: "large",
                  options: [
                    {
                      label: "Standard",
                      value: "standard",
                    },
                    {
                      label: "Large",
                      value: "large",
                    },
                    {
                      label: "None",
                      value: "none",
                    },
                  ],
                },
              ],
            },

            {
              type: "collapsible",
              label: "Google Verification",
              fields: [
                {
                  name: "googleVerification",
                  label: "Google Verification",
                  type: "text",
                },
                {
                  name: "bingVerification",
                  label: "Bing Verification",
                  type: "text",
                },
                {
                  name: "yandexVerification",
                  label: "Yandex Verification",
                  type: "text",
                },
              ],
            },

            {
              type: "collapsible",
              label: "Custom Scripts",
              fields: [
                {
                  name: "headScripts",
                  label: "Head Scripts",
                  type: "code",
                  admin: {
                    language: "html",
                    description: "These scripts will be added inside the <head> section of every page.",
                  },
                },
                {
                  name: "afterBodyScripts",
                  label: "Scripts After <body>",
                  type: "code",
                  admin: {
                    language: "html",
                    description: "These scripts will be inserted immediately after the opening <body> tag.",
                  },
                },
                {
                  name: "beforeBodyCloseScripts",
                  label: "Scripts Before </body>",
                  type: "code",
                  admin: {
                    language: "html",
                    description: "These scripts will be inserted just before the closing </body> tag.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
