import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",

  admin: {
    group: "Settings",
  },

  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },

  fields: [
    {
      name: "menu",
      type: "array",
      labels: {
        singular: "Menu Item",
        plural: "Menu Items",
      },
      fields: [
        {
          name: "label",
          type: "text",
        },

        {
          name: "type",
          type: "radio",
          defaultValue: "page",
          options: [
            {
              label: "Internal Page",
              value: "page",
            },
            {
              label: "External URL",
              value: "url",
            },
          ],
        },

        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
          admin: {
            condition: (_, siblingData) => siblingData.type === "page",
          },
        },

        {
          name: "url",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData.type === "url",
          },
        },

        {
          name: "newTab",
          type: "checkbox",
          defaultValue: false,
        },

        {
          name: "children",
          type: "array",
          labels: {
            singular: "Sub Menu",
            plural: "Sub Menu",
          },
          fields: [
            {
              name: "label",
              type: "text",
            },

            {
              name: "type",
              type: "radio",
              defaultValue: "page",
              options: [
                {
                  label: "Internal Page",
                  value: "page",
                },
                {
                  label: "External URL",
                  value: "url",
                },
              ],
            },

            {
              name: "page",
              type: "relationship",
              relationTo: "pages",
              admin: {
                condition: (_, siblingData) => siblingData.type === "page",
              },
            },

            {
              name: "url",
              type: "text",
              admin: {
                condition: (_, siblingData) => siblingData.type === "url",
              },
            },

            {
              name: "newTab",
              type: "checkbox",
            },
          ],
        },
      ],
    },
  ],
};
