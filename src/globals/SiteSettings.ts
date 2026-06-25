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
              type: "text",
            },
            {
              name: "defaultMetaDescription",
              type: "textarea",
            },
            {
              name: "defaultOgImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "googleAnalyticsId",
              type: "text",
            },
            {
              name: "googleTagManagerId",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
